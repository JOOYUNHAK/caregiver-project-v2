import { DataSource } from 'typeorm'; 
import { RoomMember } from '../entity/room-member.entity';

export const roomMemberRepository = [
    {
        provide: 'ROOM_MEMBER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RoomMember),
        inject: ['DATA_SOURCE']
    }
]