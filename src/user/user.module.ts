import { Module, forwardRef, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";
import { RedisModule } from 'src/redis/redis.module';
import { heartRepository } from './heart.repository';
import { HeartService } from './heart.service';
import { ProfileMiddleWare } from './middleware/profile.middleware';
import { UserController } from "./user.controller";

@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => AuthModule),
        RedisModule
    ],
    providers: [
        HeartService,
        ...heartRepository
    ],
    controllers: [UserController],
    exports: [
        ...heartRepository
    ]
})

export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ProfileMiddleWare)
            .forRoutes({ path: 'user/profile/:purpose', method: RequestMethod.GET})
    }
}