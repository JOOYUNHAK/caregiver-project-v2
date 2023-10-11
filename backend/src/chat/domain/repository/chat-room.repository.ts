import { DataSource, Repository } from "typeorm";
import { ChatRoom } from "../entity/chat-room.entity";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { Participant } from "../entity/participant.entity";
import { ChatMessage } from "../entity/chat-message.entity";
import { RoomListData } from "src/chat/interface/dto/room-list-data";
import { plainToInstance } from "class-transformer";

export interface ChatRoomRepository extends Repository<ChatRoom> {
    findByUserId(userId: number): Promise<RoomListData []> | null;
    findByUserIds(memberId1: number, memberId2: number): Promise<ChatRoom>;
}

export const customRoomRepositoryMethods: Pick<
    ChatRoomRepository,
    'findByUserId' |
    'findByUserIds'
> = {
    async findByUserId(this: Repository<ChatRoom>, userId: number) {

        const fetchRoomIdsQuery = `SELECT room_id FROM chat_room_participant WHERE user_id = ${userId}`;
        
        const roomList = await this.createQueryBuilder('room')
                .innerJoin((subQuery) => {
                    return subQuery
                        .select([
                            'room_id as roomId',
                            'user_id as userId'
                        ])
                        .from(Participant, 'members')
                        .where(`room_id IN (${fetchRoomIdsQuery})`)
                }, 'members', 'room.id = members.roomId AND members.userId != :userId', { userId })
                .innerJoin(ChatMessage, 'messages', 'room.id = messages.room_id and messages.is_read = :isRead', { isRead: false })
                .innerJoin((subQuery) => {
                    return subQuery
                        .select([
                            'applicationCode.id as applicationId',
                            'applicationMessage.room_id as roomId'
                        ])
                        .from(ChatMessage, 'applicationMessage')
                        .innerJoin('applicationMessage.applicationCode', 'applicationCode')
                }, 'applicationMessage','room.id = applicationMessage.roomId')
                .select('room.id as roomId') // 방 아이디
                .addSelect('members.userId as chatPartnerId') // 채팅 상대방 아이디
                .addSelect('messages.send_user_id as lastSendUserId') // 마지막 메시지 보낸 사용자 아이디
                .addSelect('MAX(messages.content) as lastMessage') // 마지막 메시지 내용
                .addSelect('COUNT(room.id) as unReadMessages') // 읽지 않은 메시지 개수
                .addSelect('MAX(messages.sended_at) as sendedAt') // 마지막 메시지 보낸 시각
                .addSelect('MAX(applicationMessage.applicationId) as applicationId') // 신청서 아이디
                .orderBy('sendedAt', 'DESC') 
                .groupBy('roomId, userId, lastSendUserId')
                .getRawMany();
        return !roomList.length ? null : plainToInstance(RoomListData, roomList);
    },

    async findByUserIds(this: Repository<ChatRoom>, memberId1: number, memberId2: number) {
        return await this.createQueryBuilder('room')
            .innerJoin((subQuery) => {
                return subQuery
                    .select('members.room_id as roomId')
                    .from(Participant, 'members')
                    .where('members.user_id = :memberId1')
                    .orWhere('members.user_id = :memberId2')
                    .setParameters({ memberId1, memberId2 })
                    .groupBy('members.room_id')
                    .having('COUNT(*) >= 2')
            }, 'members', 'room.id = members.roomId')
            .getOne();
    },
};

export const ChatRoomRepositoryProvider = {
    inject: [getDataSourceToken()],
    provide: getRepositoryToken(ChatRoom),
    useFactory(dataSource: DataSource) {
        return dataSource
            .getRepository(ChatRoom)
            .extend(customRoomRepositoryMethods);
    }
}