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

describe('간병인 프로필 서비스(CaregiverProfileService) Test', () => {
    let caregiverProfileRepository: CaregiverProfileRepository,
        caregiverProfileMapper: CaregiverProfileMapper,
        userCommonService: UserAuthCommonService,
        caregiverProfileService: CaregiverProfileService;
    
    beforeAll(async() => {
        const module = await Test.createTestingModule({
            providers: [
                CaregiverProfileService,
                MockCaregiverProfileRepository,
                MockCaregiverProfileMapper,
                MockUserAuthCommonService
            ]
        }).compile();

        caregiverProfileMapper = module.get(CaregiverProfileMapper);
        caregiverProfileRepository = module.get(CaregiverProfileRepository);
        userCommonService = module.get(UserAuthCommonService);
        caregiverProfileService = module.get(CaregiverProfileService);
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

            const result = async () => await caregiverProfileService.getProfile('1', 1);

            await expect(result).rejects.toThrowError(new NotFoundException(ErrorMessage.NotFoundProfile))
        });

        it('비공개 프로필이 아니라면 받은 사용자, 프로필 데이터를 가지고 Mapper를 호출해야 한다', async () => {
            const publicProfile = TestCaregiverProfile.default().isPrivate(false).build();

            jest.spyOn(caregiverProfileRepository, 'findById').mockResolvedValueOnce(publicProfile);
            
            const mapperSpy = jest.spyOn(caregiverProfileMapper, 'toDetailDto').mockReturnValueOnce(null);
            await caregiverProfileService.getProfile('1', 1);

            expect(mapperSpy).toHaveBeenCalledWith(userStub, publicProfile);
        })
    })
})