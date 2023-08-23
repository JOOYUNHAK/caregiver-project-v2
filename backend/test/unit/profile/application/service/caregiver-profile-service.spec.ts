import { Test } from "@nestjs/testing";
import { CaregiverProfileMapper } from "src/profile/application/mapper/caregiver-profile.mapper"
import { CaregiverProfileService } from "src/profile/application/service/caregiver-profile.service";
import { CaregiverProfileRepository } from "src/profile/infra/repository/caregiver-profile.repository"
import { MockCaregiverProfileRepository } from "test/unit/__mock__/profile/repository.mock";
import { MockCaregiverProfileMapper } from "test/unit/__mock__/profile/service.mock";
import { MockUserAuthCommonService } from "test/unit/__mock__/user-auth-common/service.mock";
import { TestCaregiverProfile } from "../../profile.fixtures";
import { TestUser } from "test/unit/user/user.fixtures";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { NotFoundException } from "@nestjs/common";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { MockProfileViewRankService } from "test/unit/__mock__/rank/rank-service.mock";
import { ProfileViewRankService } from "src/rank/application/service/profile-view-rank.service";
import { ROLE } from "src/user-auth-common/domain/enum/user.enum";
import { ProfileListQueryOptions } from "src/profile/domain/profile-list-query-options";
import { ProfileListCursor } from "src/profile/domain/profile-list.cursor";
import { ProfileSort } from "src/profile/domain/profile-sort";
import { ProfileFilter } from "src/profile/domain/profile-filter";
import { CaregiverProfileListData, ProfileListDataAsClient } from "src/profile/domain/profile-list-data";
import { GetProfileListDto } from "src/profile/interface/dto/get-profile-list.dto";

describe('간병인 프로필 서비스(CaregiverProfileService) Test', () => {
    let caregiverProfileRepository: CaregiverProfileRepository,
        caregiverProfileMapper: CaregiverProfileMapper,
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
        caregiverProfileService = module.get(CaregiverProfileService);
        profileViewRankService = module.get(ProfileViewRankService);
    });

    describe('getProfileList()', () => {
        it('반환된 데이터와 다음 커서를 생성하여 반환하는지 확인', async () => {

            const mockListQueryOption = new ProfileListQueryOptions(
                new ProfileListCursor(), new ProfileSort(), new ProfileFilter()
            );
            jest.spyOn(caregiverProfileMapper, 'toListQueryOptions').mockReturnValueOnce(mockListQueryOption); // 옵션 객체
            const profileList = [{}, {}] as CaregiverProfileListData [];
            jest.spyOn(caregiverProfileRepository, 'getProfileList').mockResolvedValueOnce(profileList)// 조회된 리스트 반환

            jest.spyOn(caregiverProfileMapper, 'toListDto').mockReturnValueOnce({} as ProfileListDataAsClient);

            const mockNextCursor = 'next cursor';
            const nextCursor = new ProfileListCursor(mockNextCursor);
            jest.spyOn(ProfileListCursor, 'createNextCursor').mockReturnValueOnce(nextCursor);
            
            const result = await caregiverProfileService.getProfileList({} as GetProfileListDto);
            const expectedResult = { caregiverProfileListData: profileList, nextCursor: mockNextCursor };
            expect(result).toEqual(expectedResult);
        })
    });

    describe('getProfile()', () => {
        
        it('비공개 프로필이면 NotFound 에러를 던져야 한다', async () => {

            const privateProfile = TestCaregiverProfile.default().isPrivate(true).build();

            jest.spyOn(caregiverProfileRepository, 'findById').mockResolvedValueOnce(privateProfile);

            const result = async () => await caregiverProfileService.getProfile('1', {} as User);

            await expect(result).rejects.toThrowError(new NotFoundException(ErrorMessage.NotFoundProfile))
        });

        describe('비공개 프로필이 아닐 경우', () => {
            
            beforeEach(() => jest.clearAllMocks() );

            it('조회한 사용자가 간병인이라면 클라이언트에게 반환할 Mapper만 호출', async () => {
                const userStub = TestUser.default() as unknown as User;
                const publicProfile = TestCaregiverProfile.default().isPrivate(false).build();
                jest.spyOn(caregiverProfileRepository, 'findById').mockResolvedValue(publicProfile);

                const rankSpy = jest.spyOn(profileViewRankService, 'increment').mockResolvedValueOnce(null);
                const mapperSpy = jest.spyOn(caregiverProfileMapper, 'toDetailDto').mockReturnValueOnce(null);
                await caregiverProfileService.getProfile('1', userStub);
                
                expect(rankSpy).not.toHaveBeenCalled();
                expect(mapperSpy).toHaveBeenCalledWith(publicProfile);
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
                expect(mapperSpy).toHaveBeenCalledWith(publicProfile);
            })
        })
    })
})