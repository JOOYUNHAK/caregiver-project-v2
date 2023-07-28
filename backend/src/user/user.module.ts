import { Module } from "@nestjs/common";
import { UserController } from "./interface/controller/user.controller";
import { UserAuthCommonModule } from "src/user-auth-common/user-auth-common.module";
import { AuthModule } from "src/auth/auth.module";
import { UserMapper } from "./application/mapper/user.mapper";
import { UserService } from "./application/service/user.service";
import { ProfileModule } from "src/profile/profile.module";

@Module({
    imports: [
        UserAuthCommonModule, 
        AuthModule,
        ProfileModule
    ],
    controllers: [UserController],
    providers: [
        UserMapper,
        UserService,
    ]
})
export class UserModule {}