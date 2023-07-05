import { Module } from "@nestjs/common";
import { UserController } from "./interface/controller/user.controller";
import { UserAuthCommonModule } from "src/user-auth-common/user-auth-common.module";
import { AuthModule } from "src/auth/auth.module";
import { MongodbModule } from "src/common/shared/database/mongodb/mongodb.module";
import { UserMapper } from "./application/mapper/user.mapper";
import { CaregiverProfileMapper } from "./application/mapper/caregiver-profile.mapper";
import { UserService } from "./application/service/user.service";
import { CaregiverProfileService } from "./application/service/caregiver-profile.service";
import { CaregiverProfileRepository } from "./infra/repository/caregiver-profile.repository";
import { PatientProfileMapper } from "./application/mapper/patient-profile.mapper";
import { PatientProfileService } from "./application/service/patient-profile.service";
import { PatientProfileRepository } from "./infra/repository/patient-profile.repository";

@Module({
    imports: [
        UserAuthCommonModule, 
        MongodbModule,
        AuthModule,
    ],
    controllers: [UserController],
    providers: [
        UserMapper,
        CaregiverProfileMapper,
        UserService,
        CaregiverProfileService,
        CaregiverProfileRepository,
        PatientProfileMapper,
        PatientProfileService,
        PatientProfileRepository
    ]
})
export class UserModule {}