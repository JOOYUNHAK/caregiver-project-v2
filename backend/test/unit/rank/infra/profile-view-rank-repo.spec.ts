import { ConfigService } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { RedisClientType } from "redis"
import { ProfileViewRankRepository } from "src/rank/infra/profile-view-rank.repository"
import { ConnectRedis, DisconnectRedis, getRedis } from "test/unit/common/database/datebase-setup.fixture"

describe('프로필 조회 랭킹 저장소(ProfileViewRankRepository', () => {
    let profileViewRankRepository: ProfileViewRankRepository;
    let redis: RedisClientType;
    const testRankKey = 'test:profile:view:rank';

    beforeAll( async () => {
        await ConnectRedis();

        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue(testRankKey)
                    }
                },
                {
                    provide: 'REDIS_CLIENT',
                    useValue: getRedis()
                },
                ProfileViewRankRepository
            ]
        }).compile();

        redis = getRedis();
        profileViewRankRepository = module.get(ProfileViewRankRepository);
    });

    afterAll(async () => await DisconnectRedis() );
    describe('increment()', () => {
        it('해당 아이디를 가진 프로필의 횟수는 1증가해야 한다.', async () => {
            const profileId = '1';
            await profileViewRankRepository.increment(profileId);

            const afterIncrement = await redis.ZSCORE(testRankKey, profileId);
            const expectedScroe = 1;

            expect(afterIncrement).toBe(expectedScroe);

            await redis.ZREM(testRankKey, profileId);
        })
    })
})