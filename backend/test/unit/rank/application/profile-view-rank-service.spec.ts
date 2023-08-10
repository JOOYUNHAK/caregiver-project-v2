import { Test } from "@nestjs/testing"
import { ProfileViewRankManager } from "src/rank/application/service/profile-view-rank.manager"
import { ProfileViewRankService } from "src/rank/application/service/profile-view-rank.service"
import { ProfileViewRankRepository } from "src/rank/infra/profile-view-rank.repository"
import { User } from "src/user-auth-common/domain/entity/user.entity"
import { UUIDUtil } from "src/util/uuid.util"
import { MockProfileViewRankRepository } from "test/unit/__mock__/rank/rank-repository.mock"
import { MockProfileViewRankManager } from "test/unit/__mock__/rank/rank-service.mock"
import { TestUser } from "test/unit/user/user.fixtures"

describe('프로필 조회 랭킹 서비스(ProfileViewRankService)', () => {
    let profileViewRankRepository: ProfileViewRankRepository;
    let profileViewRankManager: ProfileViewRankManager;
    let profileViewRankService: ProfileViewRankService;
    beforeAll(async() => {
        const module = await Test.createTestingModule({
            providers: [
                ProfileViewRankService,
                MockProfileViewRankRepository,
                MockProfileViewRankManager
            ]
        }).compile();
        profileViewRankService = module.get(ProfileViewRankService);
        profileViewRankRepository = module.get(ProfileViewRankRepository);
        profileViewRankManager = module.get(ProfileViewRankManager);
    })

    describe('increment()', () => {
        const [profileId, viewUser] = [UUIDUtil.generateOrderedUuid(), TestUser.default()];

        beforeEach(() => jest.clearAllMocks());
        
        it('이미 해당 프로필을 조회한 사용자라면 아무것도 수행하지 않는다.', async() => {
            jest.spyOn(profileViewRankManager, 'isActionPerformedByUser').mockResolvedValueOnce(true);
            
            const rankSpy = jest.spyOn(profileViewRankRepository, 'increment');
            const recordSpy = jest.spyOn(profileViewRankManager, 'recordUserAction');

            await profileViewRankService.increment(profileId, viewUser as unknown as User);

            expect(rankSpy).not.toHaveBeenCalled();
            expect(recordSpy).not.toHaveBeenCalled();
        });

        it('처음 조회한 사용자라면 조회수를 증가시키고 조회 내역을 기록하기 위한 로직을 호출한다', async() => {
            jest.spyOn(profileViewRankManager, 'isActionPerformedByUser').mockResolvedValueOnce(false);

            const rankSpy = jest.spyOn(profileViewRankRepository, 'increment');
            const recordSpy = jest.spyOn(profileViewRankManager, 'recordUserAction');
            
            await profileViewRankService.increment(profileId, viewUser as unknown as User);

            expect(rankSpy).toHaveBeenCalledWith(profileId);
            expect(recordSpy).toHaveBeenCalledWith(profileId, viewUser.getId());
        })
    })
})