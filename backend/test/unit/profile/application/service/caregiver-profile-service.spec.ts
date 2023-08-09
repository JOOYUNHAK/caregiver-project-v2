import { Test } from "@nestjs/testing";
import { CaregiverProfileMapper } from "src/profile/application/mapper/caregiver-profile.mapper"
import { CaregiverProfileService } from "src/profile/application/service/caregiver-profile.service";
import { CaregiverProfileRepository } from "src/profile/infra/repository/caregiver-profile.repository"
import { UserAuthCommonService } from "src/user-auth-common/application/user-auth-common.service"
import { MockCaregiverProfileRepository } from "test/unit/__mock__/profile/repository.mock";
import { MockCaregiverProfileMapper } from "test/unit/__mock__/profile/service.mock";
import { MockUserAuthCommonService } from "test/unit/__mock__/user-auth-common/service.mock";
import { TestCaregiverProfile } from "../../profile.fixtures";
import { AggregationCursor } from "mongodb";
import { TestUser } from "test/unit/user/user.fixtures";
import { Observable } from 'rxjs';
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { NotFoundException } from "@nestjs/common";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { MockProfileViewRankService } from "test/unit/__mock__/rank/rank-service.mock";
import { ProfileViewRankService } from "src/rank/application/service/profile-view-rank.service";
import { ROLE } from "src/user-auth-common/domain/enum/user.enum";

describe('간병인 프로필 서비스(CaregiverProfileService) Test', () => {
    let caregiverProfileRepository: CaregiverProfileRepository,
        caregiverProfileMapper: CaregiverProfileMapper,
        userCommonService: UserAuthCommonService,
        caregiverProfileService: CaregiverProfileService,
        profileViewRankService: ProfileViewRankService
    
    beforeAll(async() => {
        const module = await Test.createTestingModule({
            providers: [
                CaregiverProfileService,
                MockCaregiverProfileRepository,
                MockCaregiverProfileMapper,
                MockUserAuthCommonService,
                MockProfileViewRankService
            ]
        }).compile();

        caregiverProfileMapper = module.get(CaregiverProfileMapper);
        caregiverProfileRepository = module.get(CaregiverProfileRepository);
        userCommonService = module.get(UserAuthCommonService);
        caregiverProfileService = module.get(CaregiverProfileService);
        profileViewRankService = module.get(ProfileViewRankService);
    });

    describe('getProfileList()', () => {
        it('프로필 리스트의 개수만큼 사용자의 프로필 데이터를 조회하는지 확인', async () => {
            const [userId1, userId2] = [11, 20];

            const profileStub1 = TestCaregiverProfile.default().userId(userId1).build();
            const profileStub2 = TestCaregiverProfile.default().userId(userId2).build();
            
            const profileList = new Observable((subscribe) => {
                subscribe.next(profileStub1);
                subscribe.next(profileStub2);
                subscribe.complete();
            }) as unknown as AggregationCursor;
    
            const userStub1 = TestUser.default().withId(userId1) as unknown as User;
            const userStub2 = TestUser.default().withId(userId2) as unknown as User;
    
            jest.spyOn(caregiverProfileRepository, 'getProfileList').mockReturnValueOnce(profileList);
            jest.spyOn(userCommonService, 'findUserById')
                .mockResolvedValueOnce(userStub1)
                .mockResolvedValueOnce(userStub2);

            await caregiverProfileService.getProfileList();

            expect(userCommonService.findUserById).toHaveBeenCalledTimes(2);
            expect(caregiverProfileMapper.toListDto).toHaveBeenCalledTimes(2);
        })
    });

    describe('getProfile()', () => {
        const userStub = TestUser.default() as unknown as User;
        
        beforeAll(() => jest.spyOn(userCommonService, 'findUserById').mockResolvedValue(userStub));

        it('비공개 프로필이면 NotFound 에러를 던져야 한다', async () => {

            const privateProfile = TestCaregiverProfile.default().isPrivate(true).build();

            jest.spyOn(caregiverProfileRepository, 'findById').mockResolvedValueOnce(privateProfile);

            const result = async () => await caregiverProfileService.getProfile('1', {} as User);

            await expect(result).rejects.toThrowError(new NotFoundException(ErrorMessage.NotFoundProfile))
        });

        describe('비공개 프로필이 아닐 경우', () => {
            
            beforeEach(() => jest.clearAllMocks() );

            it('조회한 사용자가 간병인이라면 클라이언트에게 반환할 Mapper만 호출', async () => {
                const publicProfile = TestCaregiverProfile.default().isPrivate(false).build();
                jest.spyOn(caregiverProfileRepository, 'findById').mockResolvedValue(publicProfile);

                const rankSpy = jest.spyOn(profileViewRankService, 'increment').mockResolvedValueOnce(null);
                const mapperSpy = jest.spyOn(caregiverProfileMapper, 'toDetailDto').mockReturnValueOnce(null);
                await caregiverProfileService.getProfile('1', userStub);
                
                expect(rankSpy).not.toHaveBeenCalled();
                expect(mapperSpy).toHaveBeenCalledWith(userStub, publicProfile);
            });

            it('조회한 사용자가 보호자라면 순위 집계를 위한 service를 호출하고 Mapper를 호출', async () => {
                const publicProfile = TestCaregiverProfile.default().isPrivate(false).build();
                const protectorUser = TestUser.default().withRole(ROLE.PROTECTOR) as unknown as User;
                const profileId = '1';

                jest.spyOn(caregiverProfileRepository, 'findById').mockResolvedValue(publicProfile);

                const rankSpy = jest.spyOn(profileViewRankService, 'increment').mockResolvedValueOnce(null);
                const mapperSpy = jest.spyOn(caregiverProfileMapper, 'toDetailDto').mockReturnValueOnce(null);
                await caregiverProfileService.getProfile(profileId, protectorUser);
                
                expect(rankSpy).toHaveBeenCalledWith(profileId, protectorUser);
                expect(mapperSpy).toHaveBeenCalledWith(userStub, publicProfile);
            })
        })
    })
})