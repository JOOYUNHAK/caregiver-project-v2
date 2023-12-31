import { Module } from "@nestjs/common";
import { CaregiverProfileBuilder, PatientProfileBuilder } from "./domain/builder/profile.builder";
import { CaregiverProfileService } from "./application/service/caregiver-profile.service";
import { CaregiverProfileRepository } from "./infra/repository/caregiver-profile.repository";
import { PatientProfileMapper } from "./application/mapper/patient-profile.mapper";
import { PatientProfileService } from "./application/service/patient-profile.service";
import { PatientProfileRepository } from "./infra/repository/patient-profile.repository";
import { CaregiverProfileMapper } from "./application/mapper/caregiver-profile.mapper";
import { MongodbModule } from "src/common/shared/database/mongodb/mongodb.module";
import { UserAuthCommonModule } from "src/user-auth-common/user-auth-common.module";
import { ProfileController } from "./interface/controller/profile.controller";
import { RankModule } from "src/rank/rank.module";
import { ProfileQueryFactory } from "./infra/repository/profile-query.factory";
import { ProfileLikeHistoryRepoProvider } from "./domain/repository/iprofile-like-history.repository";
import { ProfileLikeHistoryService } from "./application/service/profile-like-history.service";
import { RoleGuard } from "src/core/guard/role.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileLike } from "./domain/entity/profile-like";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfileLike]),
        UserAuthCommonModule,
        MongodbModule,
        RankModule,
    ],
    controllers: [
        ProfileController
    ],
    providers: [
        CaregiverProfileBuilder,
        CaregiverProfileMapper,
        CaregiverProfileService,
        CaregiverProfileRepository,
        PatientProfileMapper,
        PatientProfileService,
        PatientProfileRepository,
        PatientProfileBuilder,
        ProfileQueryFactory,
        ProfileLikeHistoryRepoProvider,
        ProfileLikeHistoryService,
        RoleGuard
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