import { DataSource, Repository } from "typeorm";
import { ProfileViewRecord } from "../domain/entity/profile-view-record.entity";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { IActionRecordRepository } from "../domain/iaction-record.repository";
import { UUIDUtil } from "src/util/uuid.util";

export const profileViewRecordRepoMethods: Pick<
    IActionRecordRepository<ProfileViewRecord>,
    'findRecordByActionAndUser'
> = {
    async findRecordByActionAndUser(this: Repository<ProfileViewRecord>, profileId: string, userId: number)
    :Promise<ProfileViewRecord> {
        return await this.createQueryBuilder('pvr')
                .where('pvr.profile_id = :profileId', { profileId: UUIDUtil.toBinaray(profileId) })
                .andWhere('pvr.user_id = :userId', { userId })
                .getOne();
    }
};

export const ProfileViewRecordRepoProvider = {
    provide: getRepositoryToken(ProfileViewRecord),
    inject: [getDataSourceToken()],
    useFactory(dataSource: DataSource) {
        return dataSource
            .getRepository(ProfileViewRecord)
            .extend(profileViewRecordRepoMethods)
    }
};