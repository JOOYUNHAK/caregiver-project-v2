import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm"
import { DataSource } from "typeorm"
import { addTransactionalDataSource } from 'typeorm-transactional';

export const TypeOrmOptions: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.mysql.host'),
        port: configService.get('db.mysql.port'),
        username: configService.get('db.mysql.username'),
        password: configService.get('db.mysql.password'),
        database: configService.get('db.mysql.database'),
        autoLoadEntities: true,
        logging: true,
        synchronize: true
    }),
    async dataSourceFactory(option) {
        if( !option )
            throw new Error('Invalid options passed');

        return addTransactionalDataSource(new DataSource(option));
    }
};