import { Injectable, Inject } from "@nestjs/common";
import { RedisClientType } from "@redis/client";
import { Repository, DataSource, QueryRunner,  } from 'typeorm'
import { RoomInfoDto } from "./dto/room-info.dto";
import { Message } from "./entity/message.entity";
import { RoomMember } from "./entity/room-member.entity";
import { Room } from "./entity/room.entity";

@Injectable()
export class ChatService {

    constructor(

        @Inject('DATA_SOURCE')
        private dataSource: DataSource,

        @Inject('REDIS_CLIENT')
        private redis: RedisClientType

    ) { }

    //방이름에서 아이디들 parsing
    parsingRoomName(roomName: string): string[] {
        return roomName.split(':');
    }

    //상대방에게 새로운 방 이벤트 이름
    getNewRoomEventName(id: string) {
        return `NEW_ROOM:${id}`
    }

    //각 방 이름 return
    getRoomName(protectorId: string, careGiverId: string) {
        return `${protectorId}:${careGiverId}`;
    }

    //새로운 방 db에 저장
    async saveNewRoom(roomName: string) {
        const [protectorId, careGiverId] = this.parsingRoomName(roomName);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        await queryRunner.startTransaction()

        try {
            //다음 PK 값
            const { AUTO_INCREMENT } = await this.getAutoIncrementValue(queryRunner);
            //방 정보 먼저 INSERT
            await this.transactionInsertRoom(queryRunner, roomName);
            //방 멤버 INSERT
            await this.transactionInsertRoomMember(
                queryRunner, AUTO_INCREMENT,
                protectorId, careGiverId
            )
            //첫번째 메세지 INSERT
            await this.transactionInsertMessage(
                queryRunner, AUTO_INCREMENT,
                protectorId, careGiverId, 1
            )
            
            const roomInfo = await this.transactionGetRoomInfo(
                queryRunner, roomName
            )
            await queryRunner.commitTransaction();
            return roomInfo;
        }
        catch (err) {
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

    //첫번째 트랜잭션 insert
    async transactionInsertRoom(queryRunner: QueryRunner, roomName: string) {
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into(Room)
            .values({ name: roomName })
            .updateEntity(false)
            .execute()
    }

    async transactionInsertRoomMember(
        queryRunner: QueryRunner, AUTO_INCREMENT: any,
        protectorId: string, careGiverId: string
    ) {
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

    async transactionInsertMessage(
        queryRunner: QueryRunner, AUTO_INCREMENT: any,
        protectorId: string, careGiverId: string, type: number
    ) {
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into(Message)
            .values({
                room_id: AUTO_INCREMENT === null ? '1' : AUTO_INCREMENT,
                send_id: protectorId,
                receive_id: careGiverId,
                type: type
            })
            .updateEntity(false)
            .execute();
    }

    async transactionGetRoomInfo(queryRunner: QueryRunner, roomName: string): Promise<RoomInfoDto> {
        return await queryRunner.manager
            .createQueryBuilder(Room, 'room')
            .innerJoin('room.messages', 'message')
            .innerJoin('room.roomMember', 'member')
            .innerJoin('member.user_id', 'user')
            .select([
                'room.id as roomId',
                'GROUP_CONCAT(user.name) as members',
                'room.profile_state as state',
                'message.seq as messageSeq',
                'message.type as messageType',
                'message.visible as visible',
                'message.content as content',
                'message.send_id as sendId',
                'message.receive_id as receiveId',
                'Date_Format(message.send_date, "%Y년 %c월 %e일 %p %l:%i") as time',
            ])
            .where('room.name = :roomName', { roomName: roomName })
            .getRawOne()
    }

    async cacheRoomInfo(roomInfo: RoomInfoDto) {

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