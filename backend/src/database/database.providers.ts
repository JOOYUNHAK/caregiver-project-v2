/*데이터베이스 연결위한 providers */

import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '1234',
                database: 'helperproject',
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true, //개발 끝나고 배포시 false로 필히 변경
            });
            return dataSource.initialize();
        },
    },
];