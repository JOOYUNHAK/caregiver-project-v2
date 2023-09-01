import { ConflictException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { ProfileLikeHistoryService } from "src/profile/application/service/profile-like-history.service"
import { ProfileLike } from "src/profile/domain/entity/profile-like";
import { ProfileLikeHistoryRepository } from "src/profile/domain/repository/iprofile-like-history.repository";
import { MockProfileLikeHistoryRepository } from "test/unit/__mock__/profile/repository.mock";

describe('프로필 찜 내역 서비스(ProfileLikeHistoryService) Test', () => {

    let likeHisotryService: ProfileLikeHistoryService,
        likeHistoryRepository: ProfileLikeHistoryRepository;
    
    beforeAll(async() => {
        const module = await Test.createTestingModule({
            providers: [
                ProfileLikeHistoryService,
                MockProfileLikeHistoryRepository
            ]
        }).compile();
        likeHisotryService = module.get(ProfileLikeHistoryService);
        likeHistoryRepository = module.get(getRepositoryToken(ProfileLike))
    })

    describe('addHistory()', () => {
        let testProfileId: string, testUserId: number, likeStub: ProfileLike;

        beforeAll(() => {
            [testProfileId, testUserId] = ['test', 1]; likeStub = new ProfileLike(testProfileId, testUserId);
        });

        afterEach(() => jest.clearAllMocks());

        it('내역이 없을 경우 DB에 내역을 저장하기 위해 호출해야 한다', async() => {
            jest.spyOn(likeHistoryRepository, 'findByProfileAndUserId').mockResolvedValueOnce(null);
            
            await likeHisotryService.addHistory(likeStub);

            expect(likeHistoryRepository.save).toBeCalledWith(likeStub);
        });

        it('해당 사용자가 찜한 내역이 있는 경우 충돌 에러', async() => {
            jest.spyOn(likeHistoryRepository, 'findByProfileAndUserId').mockResolvedValueOnce(likeStub);
            const result = () => likeHisotryService.addHistory(likeStub);
            await expect(result).rejects.toThrowError(new ConflictException(ErrorMessage.DuplicatedLikeProfile));
        })
    })
})