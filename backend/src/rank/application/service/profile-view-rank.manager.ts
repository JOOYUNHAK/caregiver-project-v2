import { Injectable } from "@nestjs/common";
import { IRankManager } from "../../domain/irank.manager";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileViewRecord } from "src/rank/domain/entity/profile-view-record.entity";
import { IActionRecordRepository } from "src/rank/domain/iaction-record.repository";

@Injectable()
export class ProfileViewRankManager implements IRankManager {
    constructor(
        @InjectRepository(ProfileViewRecord)
        private readonly profileViewRecordRepository: IActionRecordRepository<ProfileViewRecord>
    ) {}

    /* 프로필을 조회한 사용자 기록 */
    async recordUserAction(profileId: string, viewUserId: number, ): Promise<void> {
        await this.profileViewRecordRepository.save(new ProfileViewRecord(profileId, viewUserId));
    };

    /* 해당 사용자가 해당 프로필을 조회했는지 검사 */
    async isActionPerformedByUser(profileId: string, userId: number): Promise<boolean> {
        return await this.profileViewRecordRepository
                            .findRecordByActionAndUser(profileId, userId) ? true : false;
    }
}