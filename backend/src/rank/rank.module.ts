import { Module } from "@nestjs/common";
import { ProfileViewRankRepository } from "./infra/profile-view-rank.repository";
import { RedisModule } from "src/common/shared/database/redis/redis.module";
import { ProfileViewRecordRepoProvider } from "./infra/profile-view-record.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileViewRecord } from "./domain/entity/profile-view-record.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfileViewRecord]),
        RedisModule
    ],
    providers: [
        ProfileViewRankRepository,
        ProfileViewRecordRepoProvider
    ],
})

export class RankModule {}