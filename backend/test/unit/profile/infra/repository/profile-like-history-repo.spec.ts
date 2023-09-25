import { ObjectId } from "mongodb"
import { ProfileLike } from "src/profile/domain/entity/profile-like"
import { ProfileLikeHistoryRepository, customProfileLikeHistoryMethods } from "src/profile/domain/repository/iprofile-like-history.repository"
import { TestTypeOrm } from "test/unit/common/database/datebase-setup.fixture"
import { DataSource } from "typeorm"

describe('ProfileLikeHistoryRepository(찜 내역 저장소) Test', () => {
    let historyRepository: ProfileLikeHistoryRepository;
    let dataSource: DataSource;
    
    beforeAll(async() => {
        dataSource = await TestTypeOrm.withEntities(ProfileLike);
        historyRepository = dataSource.getRepository(ProfileLike).extend(customProfileLikeHistoryMethods);
    });

    afterAll(async() => await TestTypeOrm.disconnect(dataSource));

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
    });

    describe('countById()', () => {
        let profileId: string;
        
        /* 테스트용 데이터 같은 id로 3개 삽입 */
        beforeAll(async() => {
            const insertBuffer = []; 
            profileId = new ObjectId().toHexString();
            
            for( let i = 1; i < 4; i++ ) {
                const testProfileLike = new ProfileLike(profileId, i)
                insertBuffer.push(historyRepository.save(testProfileLike));    
            }
            await Promise.all(insertBuffer);
        });

        afterAll(async() => historyRepository.clear());

        it('조회하는 프로필의 찜 개수를 정확히 가져오는지 확인', async () => {
            const result = await historyRepository.countById(profileId);
            expect(result).toBe(3);
        });

        it('조회하는 프로필의 찜 개수가 없을 때 0으로 반환되는지 확인', async () => {
            const otherId = new ObjectId().toHexString();
            const result = await historyRepository.countById(otherId);
            expect(result).toBe(0);
        })
    })
})