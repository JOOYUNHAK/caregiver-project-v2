import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { Test } from "@nestjs/testing"
import { TokenService } from "src/auth/application/service/token.service"
import { User } from "src/user-auth-common/domain/entity/user.entity"
import { ROLE } from "src/user-auth-common/domain/enum/user.enum"
import { NewUserAuthentication } from "src/user-auth-common/domain/interface/new-user-authentication.interface"
import { RefreshToken } from "src/user-auth-common/domain/refresh-token"
import { MockJwtService } from "test/unit/__mock__/auth/service.mock"
import { UserFixtures } from "test/unit/user/user.fixtures"

describe('토큰 서비스(TokenService) Test', () => {
    let tokenService: TokenService;
    let jwtService: JwtService;
    let userStub: User;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn((key: string) => {
                            switch (key) {
                                case 'jwt.accessToken.secret':
                                    return 'test_access';
                                case 'jwt.accessToken.expiresIn':
                                    return '10s';
                                case 'jwt.refreshToken.secret':
                                    return 'test_refresh';
                                case 'jwt.refreshToken.expiresIn':
                                    return '1d'
                            };
                        })
                    }
                },
                MockJwtService,
                TokenService
            ]
        }).compile()
        jwtService = module.get(JwtService);
        tokenService = module.get(TokenService);
    });

    beforeEach(() => userStub = UserFixtures.createDefault() );

    describe('generateNewUsersToken()', () => {
        it('반환된 객체는 NewUserAuthentication의 인스턴스여야한다', async () => {
            jest.spyOn(tokenService, 'generateAccessToken').mockResolvedValueOnce('testAccess');
            jest.spyOn(tokenService, 'generateRefreshToken').mockResolvedValueOnce(null);
            const result = await tokenService.generateNewUsersToken(userStub);

            expect(result).toBeInstanceOf(NewUserAuthentication);
        });

        it('생성된 토큰들에는 값들이 비어있으면 안된다', async () => {
            const testAccessToken = 'testAccess';
            jest.spyOn(tokenService, 'generateAccessToken').mockResolvedValueOnce(testAccessToken);

            const [testKey, testRefreshToken] = ['uuid', 'testRefresh'];
            const refreshToken = new RefreshToken('uuid', 'testRefresh');
            jest.spyOn(tokenService, 'generateRefreshToken').mockResolvedValueOnce(refreshToken);

            const result = await tokenService.generateNewUsersToken(userStub);
            expect(result.accessToken).toBe(testAccessToken);
            expect(result.refreshToken.getKey()).toBe(testKey);
            expect(result.refreshToken.getToken()).toBe(testRefreshToken);
        })
    })

    describe('generateRefreshToken()', () => {
        it('반환된 객체는 RefreshToken의 인스턴스여야한다', async () => {
            jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce('testRefresh');
            const result = await tokenService.generateRefreshToken(userStub);

            expect(result).toBeInstanceOf(RefreshToken);
        });

        it('생성된 refreshToken의 토큰은 get으로 조회해보면 같아야 한다.', async () => {
            const refreshToken = 'testRefreshToken';
            jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce(refreshToken);
            const result = await tokenService.generateRefreshToken(userStub);

            expect(result.getToken()).toBe(refreshToken);
        });

        it('RefreshToken이 생성될때마다 Key값과 토큰값은 달라야한다.', async () => {
            const beforeRefreshToken = 'beforeToken';
            const afterRefreshToken = 'afterToken';
            jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce(beforeRefreshToken)
                .mockResolvedValueOnce(afterRefreshToken);

            const beforeResult = await tokenService.generateRefreshToken(userStub);
            const afterResult = await tokenService.generateRefreshToken(userStub);

            expect(beforeResult.getKey()).not.toBe(afterResult.getKey());
            expect(beforeResult.getToken()).not.toBe(afterResult.getToken());
        });
    });

    describe('extractTokenFromHeader()', () => {
        it('요청의 헤더로부터 토큰이 추출되는지 확인', () => {
            const testToken = 'authorizationToken';

            const mockRequest = {
                headers: {
                    authorization: `Bearer ${testToken}`
                }
            };

            const result = tokenService.extractTokenFromHeader(mockRequest);

            expect(result).toBe(testToken);
        });
    });

    describe('decode()', () => {
        it('정상적으로 디코딩이 되는지 확인', () => {
            const payload = { userId: 1, role: ROLE.CAREGIVER, createdAt: new Date() };
            
            jest.spyOn(tokenService, 'decode').mockReturnValueOnce(payload);

            const result = tokenService.decode('');

            expect(result).toEqual(payload);
            expect(result).toHaveProperty('userId');
            expect(result).toHaveProperty('role');
            expect(result).toHaveProperty('createdAt');
        })
    })
})