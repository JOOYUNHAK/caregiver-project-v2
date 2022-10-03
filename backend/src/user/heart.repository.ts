import { DataSource } from 'typeorm'; 
import { Heart } from './entity/heart.entity';

export const heartRepository = [
    {
        provide: 'HEART_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Heart),
        inject: ['DATA_SOURCE']
    }
]