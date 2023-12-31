import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { ProfileLike } from "src/profile/domain/entity/profile-like";
import { ProfileLikeMetadata } from "src/profile/domain/profile-like-metadata";
import { ProfileLikeHistoryRepository } from "src/profile/domain/repository/iprofile-like-history.repository";

@Injectable()
/* 프로필 찜 서비스 */
export class ProfileLikeHistoryService {
    constructor(
        @InjectRepository(ProfileLike)
        private readonly historyRepository: ProfileLikeHistoryRepository
    ) {}
    /* 찜 내역 추가 */
    async addHistory(profileId: string, likeUserId: number) {
        const profileLike = new ProfileLike(profileId, likeUserId);
        /* 이미 해당 프로필을 찜한 사용자면 오류 */
        if( await this.historyRepository.findByProfileAndUserId(
            profileLike.getProfileId(),
            profileLike.getLikeUserId()
        ))  throw new ConflictException(ErrorMessage.DuplicatedLikeProfile);
        /* 처음 누른 상태면 정상적으로 저장 */
        await this.historyRepository.save(profileLike); 
    };

    /* 중복된 찜이 있을 때 삭제 */
    async deleteHistory(profileId: string, likeUserId: number) {
        await this.historyRepository.deleteByProfileAndUserId(profileId, likeUserId);
    }

    /* 특정 프로필의 찜 정보 */
    async getProfileLikeMetadata(profileId: string, viewUserId: number): Promise<ProfileLikeMetadata> {
        /* 갯수와 내가 눌렀던 내역을 조회 */
        const [likeCount, myLikeHisotry] = await Promise.all([
            this.historyRepository.countById(profileId),
            this.historyRepository.findByProfileAndUserId(profileId, viewUserId)
        ]);
        return new ProfileLikeMetadata(likeCount, myLikeHisotry);
    }
}