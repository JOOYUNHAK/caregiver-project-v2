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

    afterAll(async() => await module.close());

    describe('findByProfileAndUserId()', () => {
        let profileId: string, userId: number;

        beforeAll(async() => {
            [profileId, userId] = [new ObjectId().toHexString(), 1];
            const testProfileLike = new ProfileLike(profileId, userId);
            await historyRepository.save(testProfileLike);
        });

        afterAll(async() => await historyRepository.clear());

        it('결과가 찾아지는지 확인', async () => {
            const result = await historyRepository.findByProfileAndUserId(profileId, userId);
            expect(result).not.toBe(null);
        })
    });

    describe('deleteByProfileAndUserId()', () => {
        let profileId: string, userId: number;
        
        beforeAll(async() => {
            [profileId, userId] = [new ObjectId().toHexString(), 1];
            const testProfileLike = new ProfileLike(profileId, userId);
            await historyRepository.save(testProfileLike);
        });

        afterAll(async() => await historyRepository.clear());

        it('정상적으로 삭제되는지 확인', async () => {
            const beforeFindResult = await historyRepository.findByProfileAndUserId(profileId, userId);
            expect(beforeFindResult).not.toBe(null);

            await historyRepository.deleteByProfileAndUserId(profileId, userId);
            const afterFindResult = await historyRepository.findByProfileAndUserId(profileId, userId);

            expect(afterFindResult).toBe(null);
        });
    })
})