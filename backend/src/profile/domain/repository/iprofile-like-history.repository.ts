import { DataSource, Repository } from "typeorm";
import { ProfileLike } from "../entity/profile-like";
import { UUIDUtil } from "src/util/uuid.util";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";

export interface ProfileLikeHistoryRepository extends Repository<ProfileLike> {
    findByProfileAndUserId(profileId: string, likeUserId: number): Promise<ProfileLike>;
    deleteByProfileAndUserId(profileId: string, likeUserId: number): Promise<void>;
    countById(profileId: string): Promise<number>;
};

export const customProfileLikeHistoryMethods: Pick<
    ProfileLikeHistoryRepository,
    'findByProfileAndUserId' |
    'deleteByProfileAndUserId' |
    'countById'
    > = {
        async findByProfileAndUserId(this: Repository<ProfileLike>, profileId: string, likeUserId: number)
        : Promise<ProfileLike> {
            return await this.createQueryBuilder('plh')
                            .where('plh.profile_id = :profileId', { profileId: UUIDUtil.toBinaray(profileId) })
                            .andWhere('plh.like_user_id = :userId', { userId: likeUserId })
                            .getOne();
        },

        async deleteByProfileAndUserId(this: Repository<ProfileLike>, profileId: string, likeUserId: number) {
            await this.createQueryBuilder()
                    .delete()
                    .where('profile_id = :profileId', { profileId: UUIDUtil.toBinaray(profileId) })
                    .andWhere('like_user_id = :userId', { userId: likeUserId })
                    .execute();
        },

        async countById(this: Repository<ProfileLike>, profileId: string): Promise<any> {
            const result = await this.createQueryBuilder()
                            .select('COALESCE(COUNT(*), 0) as count')
                            .where('profile_id = :profileId', { profileId: UUIDUtil.toBinaray(profileId) })
                            .groupBy('profile_id')
                            .getRawOne();
            
            return parseInt(result?.count) || 0;
        },
    }

export const ProfileLikeHistoryRepoProvider = {
    provide: getRepositoryToken(ProfileLike),
    inject: [getDataSourceToken()],
    useFactory(dataSource: DataSource) {
        return dataSource
            .getRepository(ProfileLike)
            .extend(customProfileLikeHistoryMethods)
    }
};