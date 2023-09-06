import { UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Reflector } from "@nestjs/core"
import { Test } from "@nestjs/testing"
import { JwtAuthGuard } from "src/auth/application/guard/jwt/jwt-auth.guard"
import { JwtStrategy } from "src/auth/application/guard/jwt/jwt.strategy"
import { SessionService } from "src/auth/application/service/session.service"
import { TokenService } from "src/auth/application/service/token.service"
import { ErrorMessage } from "src/common/shared/enum/error-message.enum"
import { MockSessionService, MockTokenService } from "test/unit/__mock__/auth/service.mock"
import { MockUserAuthCommonService } from "test/unit/__mock__/user-auth-common/service.mock"
import { UserFixtures } from "test/unit/user/user.fixtures"

describe('Jwt인증가드(JwtAuthGuard) Test', () => {
    let reflector: Reflector;
    let jwtGuard: JwtAuthGuard;
    let jwtStrategy: JwtStrategy;
    let sessionService: SessionService;
    let tokenService: TokenService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                JwtAuthGuard,
                JwtStrategy,
                MockTokenService,
                MockUserAuthCommonService,
                MockSessionService,
                {
                    provide: Reflector,
                    useValue: {
                        getAllAndOverride: jest.fn()
                    }
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('test')
                    }
                }
            ]
        }).compile();

        reflector = module.get(Reflector);
        jwtGuard = module.get(JwtAuthGuard);
        jwtStrategy = module.get(JwtStrategy);
        sessionService = module.get(SessionService);
        tokenService = module.get(TokenService);
    });

    it('Public Api이면 True 반환', async () => {
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce('sef');
        const mockContext: any = {
            getHandler: jest.fn(),
            getClass: jest.fn(),
        };
        const result = await jwtGuard.canActivate(mockContext);
        expect(result).toBe(true);
    });

    describe('Public Api가 아닌 경우', () => {

        beforeAll(() => jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce(false));

        it('헤더에 토큰 정보가 없다면 에러', async () => {
            const mockContext: any = {
                getHandler: jest.fn(),
                getClass: jest.fn(),
                switchToHttp: () => ({
                    getResponse: jest.fn(),
                    getRequest: () => ({
                        headers: {},
                    })
                })
            };

            const result = async () => await jwtGuard.canActivate(mockContext);
            await expect(result).rejects.toThrowError(UnauthorizedException)
        });

        it('토큰의 형식이 잘못되었다면 에러', async () => {
            const mockContext: any = {
                getHandler: jest.fn(),
                getClass: jest.fn(),
                switchToHttp: () => ({
                    getResponse: jest.fn(),
                    getRequest: () => ({
                        headers: {
                            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
                        },
                    })
                })
            };

            const result = async () => await jwtGuard.canActivate(mockContext);
            await expect(result).rejects.toThrowError(UnauthorizedException)
        });

        it('만료된 토큰이라면 에러', async() => {
            const mockContext: any = {
                getHandler: jest.fn(),
                getClass: jest.fn(),
                switchToHttp: () => ({
                    getResponse: jest.fn(),
                    getRequest: () => ({
                        headers: {
                            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJleHAiOjE1MTYyMzkwMjJ9.eWqMgbF5Oa1oIw_UzYeuNIrLgmkOe4hN6hyfVN57f0s"
                        },
                    })
                })
            };
            
            const result = async () => await jwtGuard.canActivate(mockContext);
            await expect(result).rejects.toThrowError(new UnauthorizedException(ErrorMessage.ExpiredToken));
        });

        describe('handledRequest()', () => {
            it('user가 있는경우 그대로 반환 확인', async () => {
                const testUser = UserFixtures.createDefault();
                const result = jwtGuard.handleRequest(null, testUser, null, null, null);

                expect(result).toEqual(testUser);
            });

            it('TokenExpiredError가 난 경우 Custom ErrorMessage로 변경하여 호출', () => {
                const mockInfo = { name: 'TokenExpiredError' };

                const result = () => jwtGuard.handleRequest(null, null, mockInfo, null, null);
                expect(result).toThrowError(new UnauthorizedException(ErrorMessage.ExpiredToken));
            });

            it('TokenExpiredError가 아닌경우 기존 처리방식으로 처리 확인', () => {
                const mockInfo = { name: 'JsonWebTokenError'}

                const result = () => jwtGuard.handleRequest(null, null, mockInfo, null, null);
                expect(result).toThrowError(UnauthorizedException);
            });
        })

        describe('토큰의 유효성 검사를 모두 통과했을 경우', () => {
            
            const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxMDAxNjYzOTAyMn0.z0AfSIZ385LfcGiLQg2qeHUFcf0RfckEA7eE9EaOL24";
            const user = UserFixtures.createDefault();

            beforeEach(() => jwtStrategy.validate = jest.fn().mockResolvedValueOnce(user));

            it('인증된 사용자가 세션리스트에서 있고, 토큰이 일치하다면 요청 통과', async() => {
                const mockContext: any = {
                    getHandler: jest.fn(),
                    getClass: jest.fn(),
                    switchToHttp: () => ({
                        getResponse: jest.fn(),
                        getRequest: () => ({
                            user,
                            headers: {
                                authorization: `Bearer ${testToken}`
                            },
                        })
                    })
                };

                const sessionCallSpy = jest.spyOn(sessionService, 'getUserFromList').mockResolvedValueOnce(testToken);
                jest.spyOn(tokenService, 'extractTokenFromHeader').mockReturnValueOnce(testToken);
                const result = await jwtGuard.canActivate(mockContext);
    
                expect(sessionCallSpy).toHaveBeenCalledWith(user.getId());
                expect(result).toBe(true);
            });

            it('인증된 사용자가 세션리스트에서 없으면 401에러', async() => {    
                const mockContext: any = {
                    getHandler: jest.fn(),
                    getClass: jest.fn(),
                    switchToHttp: () => ({
                        getResponse: jest.fn(),
                        getRequest: () => ({
                            user,
                            headers: {
                                authorization: `Bearer ${testToken}` 
                            },
                        })
                    })
                };
        
                jest.spyOn(sessionService, 'getUserFromList').mockResolvedValueOnce(null);
                const result = async () => await jwtGuard.canActivate(mockContext);
    
                await expect(result).rejects.toThrowError(new UnauthorizedException(ErrorMessage.NotExistUserInSessionList));
            });

            it('세션리스트에 존재하는 사용자지만 현재 유효한 토큰과 request의 토큰이 다른경우 401 에러', async() => {    
                const mockContext: any = {
                    getHandler: jest.fn(),
                    getClass: jest.fn(),
                    switchToHttp: () => ({
                        getResponse: jest.fn(),
                        getRequest: () => ({
                            user,
                            headers: {
                                authorization: `Bearer ${testToken}` 
                            },
                        })
                    })
                };

    
                jest.spyOn(sessionService, 'getUserFromList').mockResolvedValueOnce(null);

                const diffToken = 'diffToken';
                jest.spyOn(tokenService, 'extractTokenFromHeader').mockReturnValueOnce(diffToken);

                const result = async () => await jwtGuard.canActivate(mockContext);

                await expect(result).rejects.toThrowError(new UnauthorizedException(ErrorMessage.NotExistUserInSessionList));
            })
        })
    })
})