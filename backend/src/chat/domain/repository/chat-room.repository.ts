import { DataSource, Repository } from "typeorm";
import { ChatRoom } from "../entity/chat-room.entity";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { Participant } from "../entity/participant.entity";

export interface ChatRoomRepository extends Repository<ChatRoom> {
    findByUserIds(memberId1: number, memberId2: number): Promise<ChatRoom>;
}

export const customRoomRepositoryMethods: Pick<
    ChatRoomRepository,
    'findByUserIds'
> = {
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
    provide: [getRepositoryToken(ChatRoom)],
    useFactory(dataSource: DataSource) {
        return dataSource
            .getRepository(ChatRoom)
            .extend(customRoomRepositoryMethods);
    }
}