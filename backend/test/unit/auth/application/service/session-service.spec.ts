import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { RedisClientType } from "redis";
import { SessionService } from "src/auth/application/service/session.service";
import { redisProviders } from "src/common/shared/database/redis/redis.providers";

describe('토큰 서비스(TokenService) Test', () => {
    let sessionService: SessionService;
    let redis: RedisClientType;
    
    beforeAll(async () => {

        const module = await Test.createTestingModule({
            imports: [
                ConfigModule
            ],
            providers: [
                SessionService,
                ...redisProviders,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('user:session:list')
                    }
                }
            ]
        }).compile();

        sessionService = module.get(SessionService);
        redis = module.get('REDIS_CLIENT');
    });

    afterAll( async () => { await redis.disconnect(); });

    describe('addUserToList()', () => {
        it('주어진 아이디와 토큰이 세션리스트에 저장되어야 한다', async () => {
            await sessionService.addUserToList(1, 'testAccessToken');

            const result = await redis.HGET('user:session:list', '1');
            expect(result).toBe('testAccessToken');
            
            await redis.HDEL('user:session:list', '1');
        })
    });

    describe('getUserFromList()', () => {
        it('찾는 유저가 없으면 Null값이 반환', async() => {
            const result = await sessionService.getUserFromList(11);

            expect(result).toBe(null);
        });

        it('현재 세션리스트에 사용자가 있으면 해당 토큰 반환', async() => {
            await sessionService.addUserToList(40, 'testAccessToken');

            const result = await sessionService.getUserFromList(40);
            expect(result).toBe('testAccessToken');

            await redis.HDEL('user:session:list', '40');
        });
    })
})