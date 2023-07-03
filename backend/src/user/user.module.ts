import { Module } from "@nestjs/common";
import { UserController } from "./interface/controller/user.controller";
import { RegisterService } from "./application/service/register.service";
import { UserAuthCommonModule } from "src/user-auth-common/user-auth-common.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarePeriod } from "./domain/entity/protector/care-period.entity";
import { Protector } from "./domain/entity/protector/protector.entity";
import { ProtectorMapper } from "./application/mapper/protector.mapper";
import { AuthModule } from "src/auth/auth.module";
import { MongodbModule } from "src/common/shared/database/mongodb/mongodb.module";
import { UserMapper } from "./application/mapper/user.mapper";
import { CaregiverProfileMapper } from "./application/mapper/caregiver-profile.mapper";
import { UserService } from "./application/service/user.service";
import { CaregiverProfileService } from "./application/service/caregiver-profile.service";
import { CaregiverProfileRepository } from "./infra/repository/caregiver-profile.repository";

@Module({
    imports: [
        UserAuthCommonModule, 
        TypeOrmModule.forFeature([CarePeriod, Protector]), 
        MongodbModule,
        AuthModule,
    ],
    controllers: [UserController],
    providers: [
        RegisterService, 
        ProtectorMapper,
        UserMapper,
        CaregiverProfileMapper,
        UserService,
        CaregiverProfileService,
        CaregiverProfileRepository
    ]
})
export class UserModule {}