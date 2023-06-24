import { Module } from "@nestjs/common";
import { UserController } from "./interface/controller/user.controller";
import { RegisterService } from "./application/service/register.service";
import { UserAuthCommonModule } from "src/user-auth-common/user-auth-common.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarePeriod } from "./domain/entity/protector/care-period.entity";
import { Protector } from "./domain/entity/protector/protector.entity";
import { ProtectorMapper } from "./application/mapper/protector.mapper";
import { TokenService } from "src/auth/application/service/token.service";

@Module({
    imports: [UserAuthCommonModule, TypeOrmModule.forFeature([CarePeriod, Protector])],
    controllers: [UserController],
    providers: [RegisterService, ProtectorMapper, TokenService]
})
export class UserModule {}