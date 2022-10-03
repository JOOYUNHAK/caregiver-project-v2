import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";
import { heartRepository } from './heart.repository';
import { HeartService } from './heart.service';
import { UserController } from "./user.controller";

@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => AuthModule)
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

export class UserModule {}