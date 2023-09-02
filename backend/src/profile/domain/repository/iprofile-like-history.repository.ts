import { DataSource, Repository } from "typeorm";
import { ProfileLike } from "../entity/profile-like";
import { UUIDUtil } from "src/util/uuid.util";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";

export interface ProfileLikeHistoryRepository extends Repository<ProfileLike> {
    findByProfileAndUserId(profileId: string, likeUserId: number): Promise<ProfileLike>;
    deleteByProfileAndUserId(profileId: string, likeUserId: number): Promise<void>;
};

export const customProfileLikeHistoryMethods: Pick<
    ProfileLikeHistoryRepository,
    'findByProfileAndUserId' |
    'deleteByProfileAndUserId'
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
        }    
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