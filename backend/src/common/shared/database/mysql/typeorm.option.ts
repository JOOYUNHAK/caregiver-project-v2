import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm"
import { Token } from "src/user-auth-common/domain/entity/auth-token.entity"
import { Email } from "src/user-auth-common/domain/entity/user-email.entity"
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity"
import { UserProfile } from "src/user-auth-common/domain/entity/user-profile.entity"
import { User } from "src/user-auth-common/domain/entity/user.entity"

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
        entities: [User, Email, Phone, UserProfile, Token],
        logging: true,
        synchronize: true
    })
};