import { DataSource } from 'typeorm'; 
import { Room } from '../entity/room.entity';

export const roomRepository = [
    {
        provide: 'ROOM_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Room),
        inject: ['DATA_SOURCE']
    }
]