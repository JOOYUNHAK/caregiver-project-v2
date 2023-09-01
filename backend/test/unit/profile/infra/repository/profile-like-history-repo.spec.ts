import { Test, TestingModule } from "@nestjs/testing"
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm"
import { ObjectId } from "mongodb"
import { ProfileLike } from "src/profile/domain/entity/profile-like"
import { ProfileLikeHistoryRepository, customProfileLikeHistoryMethods } from "src/profile/domain/repository/iprofile-like-history.repository"
import { TestTypeOrmOptions } from "test/unit/common/database/datebase-setup.fixture"

describe('ProfileLikeHistoryRepository(찜 내역 저장소) Test', () => {
    let historyRepository: ProfileLikeHistoryRepository;
    let module: TestingModule;
    beforeAll(async() => {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(TestTypeOrmOptions),
                TypeOrmModule.forFeature([ProfileLike])
            ]
        }).compile();
        historyRepository = module.get(getRepositoryToken(ProfileLike));
        historyRepository = historyRepository.extend(customProfileLikeHistoryMethods)
    });

    describe('findByProfileAndUserId()', () => {
        let profileId: string, userId: number;

        beforeAll(async() => {
            [profileId, userId] = [new ObjectId().toHexString(), 1];
            const testProfileLike = new ProfileLike(profileId, userId);
            await historyRepository.save(testProfileLike);
        });

        afterAll(async() => {
            await historyRepository.clear();
            await module.close();
        });

        it('결과가 찾아지는지 확인', async () => {
            const result = await historyRepository.findByProfileAndUserId(profileId, userId);
            expect(result).not.toBe(null);
        })
    })
})