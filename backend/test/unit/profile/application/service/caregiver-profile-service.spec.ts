import { Test } from "@nestjs/testing";
import { CaregiverProfileMapper } from "src/profile/application/mapper/caregiver-profile.mapper"
import { CaregiverProfileService } from "src/profile/application/service/caregiver-profile.service";
import { CaregiverProfileRepository } from "src/profile/infra/repository/caregiver-profile.repository"
import { MockCaregiverProfileRepository } from "test/unit/__mock__/profile/repository.mock";
import { MockCaregiverProfileMapper, MockProfileLikeHistoryService } from "test/unit/__mock__/profile/service.mock";
import { TestCaregiverProfile } from "../../profile.fixtures";
import { NotFoundException } from "@nestjs/common";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { ProfileListQueryOptions } from "src/profile/domain/profile-list-query-options";
import { ProfileListCursor } from "src/profile/domain/profile-list.cursor";
import { ProfileSort } from "src/profile/domain/profile-sort";
import { ProfileFilter } from "src/profile/domain/profile-filter";
import { CaregiverProfileListData, ProfileListDataAsClient } from "src/profile/domain/profile-list-data";
import { GetProfileListDto } from "src/profile/interface/dto/get-profile-list.dto";
import { ProfileLikeHistoryService } from "src/profile/application/service/profile-like-history.service";
import { ProfileLikeMetadata } from "src/profile/domain/profile-like-metadata";

describe('간병인 프로필 서비스(CaregiverProfileService) Test', () => {
    let caregiverProfileRepository: CaregiverProfileRepository,
        caregiverProfileMapper: CaregiverProfileMapper,
        caregiverProfileService: CaregiverProfileService,
        profileLikeHistoryService: ProfileLikeHistoryService;

    beforeAll(async() => {
        const module = await Test.createTestingModule({
            providers: [
                CaregiverProfileService,
                MockCaregiverProfileRepository,
                MockCaregiverProfileMapper,
                MockProfileLikeHistoryService
            ]
        }).compile();

        caregiverProfileMapper = module.get(CaregiverProfileMapper);
        caregiverProfileRepository = module.get(CaregiverProfileRepository);
        caregiverProfileService = module.get(CaregiverProfileService);
        profileLikeHistoryService = module.get(ProfileLikeHistoryService);
    });

    describe('getProfileList()', () => {
        it('반환된 데이터와 다음 커서를 생성하여 반환하는지 확인', async () => {

            const mockListQueryOption = new ProfileListQueryOptions(
                new ProfileListCursor(), new ProfileSort(), new ProfileFilter()
            );
            jest.spyOn(caregiverProfileMapper, 'toListQueryOptions').mockReturnValueOnce(mockListQueryOption); // 옵션 객체
            const profileList = [{}, {}] as CaregiverProfileListData [];
            jest.spyOn(caregiverProfileRepository, 'getProfileList').mockResolvedValueOnce(profileList)// 조회된 리스트 반환

            jest.spyOn(caregiverProfileMapper, 'toListDto').mockReturnValue({} as ProfileListDataAsClient);

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

            const result = async () => await caregiverProfileService.getProfile('1', 1);

            await expect(result).rejects.toThrowError(new NotFoundException(ErrorMessage.NotFoundProfile))
        });

        describe('비공개 프로필이 아닐 경우', () => {
            
            beforeEach(() => jest.clearAllMocks() );

            it('프로필 데이터와 해당 프로필의 찜 관련 데이터를 받고 Mapper 호출', async () => {
                const publicProfile = TestCaregiverProfile.default().isPrivate(false).build();
                const likeMetadata = new ProfileLikeMetadata(10, null);

                jest.spyOn(caregiverProfileRepository, 'findById').mockResolvedValue(publicProfile);
                jest.spyOn(profileLikeHistoryService, 'getProfileLikeMetadata').mockResolvedValueOnce(likeMetadata);

                const mapperSpy = jest.spyOn(caregiverProfileMapper, 'toDetailDto')
                await caregiverProfileService.getProfile('1', 1);
                
                expect(mapperSpy).toHaveBeenCalledWith(publicProfile, likeMetadata);
            });
        })
    })
})