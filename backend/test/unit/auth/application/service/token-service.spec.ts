import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { RedisClientType } from "redis";
import { TokenService } from "src/auth/application/service/token.service";
import { redisProviders } from "src/common/shared/database/redis/redis.providers";

describe('토큰 서비스(TokenService) Test', () => {
    let tokenService: TokenService;
    let redis: RedisClientType;
    
    beforeAll(async () => {

        const module = await Test.createTestingModule({
            imports: [
                ConfigModule
            ],
            providers: [
                TokenService,
                ...redisProviders,
                {
                    provide: JwtService,
                    useValue: {}
                },
            ]
        }).compile();

        tokenService = module.get(TokenService);
        redis = module.get('REDIS_CLIENT');
    });

    afterAll( async () => { await redis.disconnect(); });

    describe('addAccessTokenToSessionList()', () => {
        it('주어진 아이디와 토큰이 세션리스트에 저장되어야 한다', async () => {
            await tokenService.addAccessTokenToSessionList(1, 'testAccessToken');

            const result = await redis.HGET('user:session:list', '1');
            expect(result).toBe('testAccessToken');
            
            await redis.HDEL('user:session:list', '1');
        })
    })
})