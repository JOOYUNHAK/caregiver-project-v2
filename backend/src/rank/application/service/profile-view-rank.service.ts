import { Injectable } from "@nestjs/common";
import { IRankService } from "src/rank/domain/irank.service";
import { ProfileViewRankRepository } from "src/rank/infra/profile-view-rank.repository";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { ProfileViewRankManager } from "./profile-view-rank.manager";

@Injectable()
export class ProfileViewRankService implements IRankService {
    
    constructor(
        private readonly profileViewRankRepository: ProfileViewRankRepository,
        private readonly profileViewRankManager: ProfileViewRankManager
    ) {};

    async increment(profileId: string, viewUser: User): Promise<void> {
        /* 만약 해당 프로필을 처음 조회한 사용자라면 명단에 추가이후 조회 집계 증가 */
        if( !await this.profileViewRankManager.isActionPerformedByUser(profileId, viewUser.getId()) ) {
            await Promise.all([
                this.profileViewRankManager.recordUserAction(profileId, viewUser.getId()),
                this.profileViewRankRepository.increment(profileId)
            ])
        }
    };
}