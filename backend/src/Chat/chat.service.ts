import { Injectable, Inject } from "@nestjs/common";
import { RedisClientType } from "@redis/client";
import { DataSource, QueryRunner, } from 'typeorm'
import { RedisMessageValueDto } from "./dto/redis-message-value.dto";
import { RedisRoomValueDto } from "./dto/redis-room-value.dto";
import { RoomInfoDto } from "./dto/room-info.dto";
import { RoomMemberDto } from "./dto/room-member.dto";
import { SendMessageDto } from "./dto/send-message.dto";
import { Message } from "./entity/message.entity";
import { RoomMember } from "./entity/room-member.entity";
import { Room } from "./entity/room.entity";
import * as fs from 'fs';
import { Console } from "console";

@Injectable()
export class ChatService {

    constructor(

        @Inject('DATA_SOURCE')
        private dataSource: DataSource,

        @Inject('REDIS_CLIENT')
        private redis: RedisClientType,

    ) { }

    //상대방에게 새로운 방 이벤트 이름
    getNewRoomEventName(id: string) {
        return `newroom:${id}`
    }

    async isExistRoom(roomMemberDto: RoomMemberDto) {
        return await this.dataSource.createQueryBuilder(Room, 'room')
            .innerJoin('room.roomMember', 'members')
            .select('room.id as roomId')
            .where('members.user_id = :id1 AND members.user_id = :id1', { 
                id1: roomMemberDto.careGiverId, id2: roomMemberDto.protectorId
            })
            .getRawOne()
    }

    //새로운 방 db에 저장
    async saveNewRoom(roomMemberDto: RoomMemberDto) {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        await queryRunner.startTransaction()

        try {
            //다음 PK 값
            const { AUTO_INCREMENT } = await this.getAutoIncrementValue(queryRunner);
            //방 정보 먼저 INSERT
            await this.transactionInsertRoom(queryRunner);
            //방 멤버 INSERT
            await this.transactionInsertRoomMember(
                queryRunner, AUTO_INCREMENT, roomMemberDto
            )
            //첫번째 메세지 INSERT
            await this.transactionInsertMessage(
                queryRunner, AUTO_INCREMENT, roomMemberDto
            )

            const roomInfo = await this.transactionGetRoomInfo(
                queryRunner, AUTO_INCREMENT
            )
            await queryRunner.commitTransaction();
            return roomInfo;
        }
        catch (err) {
            console.log(err)
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }

    //현재 autoincrement값
    async getAutoIncrementValue(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.manager
            .createQueryBuilder()
            .select('AUTO_INCREMENT')
            .from('INFORMATION_SCHEMA.TABLES', 'table_info')
            .where('TABLE_SCHEMA = :DatabaseName AND TABLE_NAME = :TableName', {
                DatabaseName: 'helperProject',
                TableName: 'room'
            })
            .getRawOne();
    }

    //첫번째 트랜잭션 insert(방 정보)
    async transactionInsertRoom(queryRunner: QueryRunner) {
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into(Room)
            .values({})
            .updateEntity(false)
            .execute()
    }

    //두번째 트랜잭션 insert (방 멤버)
    async transactionInsertRoomMember(
        queryRunner: QueryRunner, AUTO_INCREMENT: any, roomMemberDto: RoomMemberDto
    ) {
        const { protectorId, careGiverId } = roomMemberDto;
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into(RoomMember)
            .values([
                { room_id: AUTO_INCREMENT === null ? '1' : AUTO_INCREMENT, user_id: protectorId },
                { room_id: AUTO_INCREMENT === null ? '1' : AUTO_INCREMENT, user_id: careGiverId }
            ])
            .execute();
    }

    //세번째 트랜잭션 insert(message 내용)
    async transactionInsertMessage(
        queryRunner: QueryRunner, AUTO_INCREMENT: any,
        roomMemberDto: RoomMemberDto, type?: number
    ) {
        const { protectorId } = roomMemberDto;
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into(Message)
            .values({
                room_id: AUTO_INCREMENT === null ? '1' : AUTO_INCREMENT,
                send_id: protectorId,
                type: type
            })
            .updateEntity(false)
            .execute();
    }

    //마지막 트랜잭션 (입력한 데이터 바로 상대 유저에게 return 위해)
    async transactionGetRoomInfo(queryRunner: QueryRunner, AUTO_INCREMENT: any): Promise<RoomInfoDto> {
        return await queryRunner.manager
            .createQueryBuilder(Room, 'room')
            .innerJoin('room.messages', 'message')
            .innerJoin('room.roomMember', 'member')
            .innerJoin('member.user_id', 'user')
            .select([
                'room.id as roomId',
                'GROUP_CONCAT(user.name) as members',
                'GROUP_CONCAT(member.user_id) as memberIds',
                'room.profile_state as state',
                'message.seq as messageSeq',
                'message.type as type',
                'message.visible as visible',
                'message.content as content',
                'message.send_id as sendId',
                //'Date_Format(message.send_date, "%Y년 %c월 %e일 %p %l:%i") as time',
                'message.send_date as time',
            ])
            .where('room.id = :id', { id: AUTO_INCREMENT == null ? '1' : AUTO_INCREMENT })
            .getRawOne()
    }

    //redis 방 정보, 메세지의 키 값 return
    getRedisChatKey(roomId: number, type: string) {
        if (type === 'roomInfo')
            return `room:${roomId}`;
        return `room:${roomId}:message`;
    }

    //방 정보 redis save
    async cachingRoomInfo(roomInfo: RoomInfoDto, redisRoomValue: RedisRoomValueDto) {
        const redisRoomKey = this.getRedisChatKey(roomInfo.roomId, 'roomInfo');
        await this.redis.HSET('room:info', redisRoomKey, JSON.stringify(redisRoomValue))
    }

    //방 정보 redis value 값 구하기
    newRedisRoomValue(roomInfo: RoomInfoDto): RedisRoomValueDto {
        const { roomId, members, memberIds, state } = roomInfo;
        return {
            roomId, memberIds, members, state, newMessage: 1
        }
    }

    //메세지 내용 redis save
    async cachingMessage(roomInfo: RoomInfoDto, redisMessageValue: RedisMessageValueDto) {
        const redisMessageKey = this.getRedisChatKey(roomInfo.roomId, 'message');
        await this.redis.LPUSH(redisMessageKey, JSON.stringify(redisMessageValue));
    }

    //메세지 내용 redis value 구하기
    newRedisMessageValue(roomInfo: RoomInfoDto): RedisMessageValueDto {

        const { messageSeq, type, visible, content, sendId, time } = roomInfo;
        return {
            messageSeq, type, visible, content, sendId, time
        }
    }

    //방 번호 return
    async getRoomIds(userId: string): Promise<{roomIds: string}> {
        return await this.dataSource
            .createQueryBuilder(Room, 'room')
            .innerJoin('room.roomMember', 'members')
            //.innerJoin('members.user_id', 'user', 'user.id = :id', { id: userId })
            .select('GROUP_CONCAT(room.id) as roomIds')
            .where('members.user_id = :id', { id: userId })
            .getRawOne();
    }

    //방 리스트 조회
    async getRoomList(userRoomIds: {roomIds: string }): Promise<RoomInfoDto []> {
        const { roomIds } = userRoomIds
        if (!roomIds) return null;
        if (roomIds.includes(','))
            return this.getCacheRoomList(roomIds.split(','));
        return this.getCacheRoomOne(roomIds)
    }

    //방 목록 하나
    async getCacheRoomOne(roomId: string): Promise<RoomInfoDto []> {
        const roomInfo = JSON.parse(await this.redis.HGET('room:info', `room:${roomId}`));
        const lastMessage = JSON.parse(await this.redis.LINDEX(`room:${roomId}:message`, 0));
        if( !roomInfo || !lastMessage)
            return null
        return [
            { ...roomInfo, ...lastMessage }
        ]
    }

    //방 목록 여러개
    async getCacheRoomList(roomIds: string[]) {
        let roomList = [];
        for (let i = 0; i < roomIds.length; i++) {
            const roomInfo = JSON.parse(await this.redis.HGET('room:info', `room:${roomIds[i]}`));
            const lastMessage = JSON.parse(await this.redis.LINDEX(`room:${roomIds[i]}:message`, 0));
            if( !roomInfo || !lastMessage )
                continue;
            roomList.push({ ...roomInfo, ...lastMessage });
        }
        return roomList;
    }

    //해당방에 모든 메세지
    async getAllMessages(roomId: number) {
        //const redisMessageKey = this.getRedisChatKey(roomId, 'message');
        //@todo 길이 구해서 처음 일정갯수만 가져오기
        const messages = await this.redis.LRANGE(`room:${roomId}:message`, 0, -1)
        console.log(messages)
        return messages.map(message => JSON.parse(message));
    }

    //새로운 메세지가 오면 캐시에 저장
    async storeMessageToCache(sendMessageDto: SendMessageDto) {
        const { roomId } = sendMessageDto;
        await this.redis.LPUSH(`room:${roomId}:message`, JSON.stringify(sendMessageDto));
    }

    //새로 왔던 메세지들 읽기
    async readNewMessage(roomId: number) {
        let room = JSON.parse( await this.redis.HGET(`room:info`, `room:${roomId}` ));
        room.newMessage = 0;
        this.redis.HSET('room:info', `room:${roomId}`, JSON.stringify(room));
    }

    //보냈던 사람하고 같은지
    async isLastSendUser( joinInfo: { loginId: string, roomId: number }) {
        const { loginId, roomId } = joinInfo;
        let lastMessage = await this.redis.LRANGE(`room:${roomId}:message`, 0, 0);
        lastMessage = JSON.parse(lastMessage[0]);
        //마지막 보낸사람이 자기 자신이면 false
        if( loginId === lastMessage['sendId'] )
            return false;
        return true;
    }

    //새로운 매세지 갯수 증가
    async addNewMessageCount(roomId: number) {
        let room = JSON.parse( await this.redis.HGET('room:info', `room:${roomId}`));
        room.newMessage += 1;
        this.redis.HSET('room:info', `room:${roomId}`, JSON.stringify(room));
    }


    //방에 있는 유저들 아이디
    async getOpponentId(roomId: number) {
        return await this.dataSource 
            .createQueryBuilder(Room, 'room')
            .innerJoin('room.roomMember', 'members')
            .innerJoin('members.user_id', 'user')
            .select('user.id as opponentId')
            .where('room.id = :id ', {id: roomId })
            .getRawMany();
        }

    //해당 방의 프로필 상태 업데이트
    async updateApplication(roomId:number, state: number) {
        let room = JSON.parse( await this.redis.HGET('room:info', `room:${roomId}`));   
        room.state = state;
        await this.redis.HSET('room:info', `room:${roomId}`, JSON.stringify(room));
    }

    //간병 신청 마감
    async applicationDeadLine(roomId: number, response: string) {
        const messageKey = `room:${roomId}:message`;
        const messageCount = await this.redis.LLEN(messageKey);
        for( let i = 0; i < messageCount; i++ ) {
            let eachMessage = JSON.parse( await this.redis.LINDEX(messageKey, i) )
            //신청 메세지인데 아직 응답이 없는 메세지인 경우
            if( eachMessage.type == 0 && eachMessage.content === null) {
                eachMessage.content = response;
                await this.redis.LSET(messageKey, i, JSON.stringify(eachMessage))
                break;
            }
        }
    }

    storeMessageToFile(messageDto: SendMessageDto) {
        fs.open('./chat_files/messages.txt', 'wx', (err, fd) => {
            if( err ) {
                if( err.code === 'EEXIST' ) {
                    return this.writeMessageToFile(messageDto);
                }
            }
            this.writeTitleToFile();
            this.writeMessageToFile(messageDto);
            return fs.close(fd)
        })
    }

    writeMessageToFile(messageDto: SendMessageDto) {
        const {roomId, content, type, time, sendId} = messageDto;
        const message = roomId + '    ' + type + '    ' + content + '    ' + time + '    ' + sendId + '\r\n';
        fs.writeFile('./chat_files/messages.txt', message, {
            mode: 0o666,
            flag: 'a'
        }, (err) => {
            console.log(err)
        });
    }

    writeTitleToFile() {
        const title = 'room_id' + '    ' + 'type' + '    ' + 'content' + '    ' + 'send_date' + '    ' + 'send_id' + '\r\n';
        fs.writeFile('./chat_files/messages.txt', title, {
            mode: 0o666,
            flag: 'w'
        }, (err) => {
            console.log('writeTitleError: ', err)
        })
    }

    //처음 생성된 방 정보
    async getInitRoomInfo(protectorId: string, careGiverId: string) {
        const roomName = `${protectorId}:${careGiverId}`;
        /*  const result = await this.dataSource
             .createQueryBuilder(Room, 'room')
             .innerJoin(Message, 'message')
             .innerJoin(RoomMember, 'roomMember')
             .innerJoin(User, 'user')
             .select( subQuery => {
                 return subQuery 
                     .select("GROUP_CONCAT(user.name) as name")
                     .from(User, 'user')
                     .where('id IN (:id1, :id2)', { id1: protectorId, id2: careGiverId })
             }, "members")
             .addSelect([
                 'room.id as roomId',
                 'room.profile_state as state',
                 'message.seq as seq',
                 'message.type as type',
                 'message.visible as visible',
                 'message.content as content',
                 'message.send_id as sendId',
                 'message.receive_id as receiveId',
                 'message.send_date as time',
             ])
             .where('room.name = :roomName', { roomName: roomName })
             .getRawOne();
             console.log(result) */
    }
}