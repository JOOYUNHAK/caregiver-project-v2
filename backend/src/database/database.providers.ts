/*데이터베이스 연결위한 providers */

import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        import: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: configService.get('db.mysql.host'),
                port: configService.get('db.mysql.port'),
                username: configService.get('db.mysql.username'),
                password: configService.get('db.mysql.password'),
                database: configService.get('db.mysql.database'),
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true, //개발 끝나고 배포시 false로 필히 변경,
                logging:true
            });
            return dataSource.initialize();
        },
    },
];