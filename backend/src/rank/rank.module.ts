import { Module } from "@nestjs/common";
import { ProfileViewRankService } from "./application/service/profile-view-rank.service";
import { ProfileViewRankRepository } from "./infra/profile-view-rank.repository";
import { RedisModule } from "src/common/shared/database/redis/redis.module";
import { ProfileViewRankManager } from "./application/service/profile-view-rank.manager";
import { ProfileViewRecordRepoProvider } from "./infra/profile-view-record.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileViewRecord } from "./domain/entity/profile-view-record.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfileViewRecord]),
        RedisModule
    ],
    providers: [
        ProfileViewRankService,
        ProfileViewRankRepository,
        ProfileViewRankManager,
        ProfileViewRecordRepoProvider
    ],
    exports: [
        ProfileViewRankService
    ]
})

export class RankModule {}