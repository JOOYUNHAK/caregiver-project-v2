import { Module } from '@nestjs/common';
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";
import { UserController } from "./user.controller";

@Module({
    imports: [
        DatabaseModule,
        AuthModule
    ],
    controllers: [UserController]
})

export class UserModule {}