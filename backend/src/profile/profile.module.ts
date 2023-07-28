import { Module } from "@nestjs/common";
import { CaregiverProfileBuilder, PatientProfileBuilder } from "./domain/builder/profile.builder";
import { CaregiverProfileService } from "./application/service/caregiver-profile.service";
import { CaregiverProfileRepository } from "./infra/repository/caregiver-profile.repository";
import { PatientProfileMapper } from "./application/mapper/patient-profile.mapper";
import { PatientProfileService } from "./application/service/patient-profile.service";
import { PatientProfileRepository } from "./infra/repository/patient-profile.repository";
import { CaregiverProfileMapper } from "./application/mapper/caregiver-profile.mapper";
import { MongodbModule } from "src/common/shared/database/mongodb/mongodb.module";

@Module({
    imports: [
        MongodbModule
    ],
    providers: [
        CaregiverProfileBuilder,
        CaregiverProfileMapper,
        CaregiverProfileService,
        CaregiverProfileRepository,
        PatientProfileMapper,
        PatientProfileService,
        PatientProfileRepository,
        PatientProfileBuilder
    ],
    exports: [
        CaregiverProfileBuilder,
        CaregiverProfileMapper,
        CaregiverProfileService,
        CaregiverProfileRepository,
        PatientProfileMapper,
        PatientProfileService,
        PatientProfileRepository,
        PatientProfileBuilder
    ]
})
export class ProfileModule {}