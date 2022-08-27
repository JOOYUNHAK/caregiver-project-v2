import { DataSource } from "typeorm";
import { Assistant, CareGvier, Protector } from "./entity/register.entity";


//간병인 테이블
export const careGiverRepository = [
    {
        provide: 'CAREGIVER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CareGvier),
        inject: ['DATA_SOURCE']
    }
];

//활동보조사 테이블
export const assistantRepository = [
    {
        provide: 'ASSISTANT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Assistant),
        inject: ['DATA_SOURCE']
    }
];

//보호자 테이블 
export const protectorRepository = [
    {
        provide: 'PROTECTOR_REPOSITORY',
        useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(Protector),
        inject: ['DATA_SOURCE']
    }
];
