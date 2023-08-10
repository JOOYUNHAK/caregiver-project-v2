import { Module } from "@nestjs/common";
import { ProfileViewRecordRepoProvider } from "./infra/profile-view-record.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileViewRecord } from "./domain/entity/profile-view-record.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfileViewRecord]),
    ],
    providers: [
        ProfileViewRecordRepoProvider
    ],
})

export class RankModule {}