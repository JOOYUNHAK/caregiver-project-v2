import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { RedisClientType } from "redis";
import { SessionService } from "src/auth/application/service/session.service";
import { ConnectRedis, getRedis } from "test/unit/common/database/datebase-setup.fixture";

describe('토큰 서비스(TokenService) Test', () => {
    let sessionService: SessionService;
    let redis: RedisClientType;

    beforeAll(async () => {
        await ConnectRedis();

        const module = await Test.createTestingModule({
            imports: [
                ConfigModule
            ],
            providers: [
                SessionService,
                {
                    provide: 'REDIS_CLIENT',
                    useValue: getRedis()
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('user:session:list')
                    }
                }
            ]
        }).compile();

        sessionService = module.get(SessionService);
        redis = module.get('REDIS_CLIENT')
    });

    afterAll(async () => { await redis.disconnect(); });

    describe('addUserToList()', () => {
        it('주어진 아이디와 토큰이 세션리스트에 저장되어야 한다', async () => {
            await sessionService.addUserToList(1, 'testAccessToken');

            const result = await sessionService.getUserFromList(1);
            expect(result).toBe('testAccessToken');

            await sessionService.deleteUserFromList(1);
        })
    });

    describe('getUserFromList()', () => {
        it('찾는 유저가 없으면 Null값이 반환', async () => {
            const result = await sessionService.getUserFromList(11);

            expect(result).toBe(null);
        });

        it('현재 세션리스트에 사용자가 있으면 해당 토큰 반환', async () => {
            await sessionService.addUserToList(40, 'testAccessToken');

            const result = await sessionService.getUserFromList(40);
            expect(result).toBe('testAccessToken');

            await sessionService.deleteUserFromList(40);
        });
    });

    describe('deleteUserFromList', () => {
        it('세션리스트에 존재하는 사용자가 삭제되는지 확인', async () => {
            await sessionService.addUserToList(100, 'test');

            const beforeFindResult = await sessionService.getUserFromList(100);
            expect(beforeFindResult).not.toBe(null);

            await sessionService.deleteUserFromList(100);

            const afterFindResult = await sessionService.getUserFromList(100);
            expect(afterFindResult).toBe(null);
        })
    })
})