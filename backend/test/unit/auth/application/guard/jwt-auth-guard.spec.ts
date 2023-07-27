import { UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Reflector } from "@nestjs/core"
import { Test } from "@nestjs/testing"
import { JwtAuthGuard } from "src/auth/application/guard/jwt/jwt-auth.guard"
import { JwtStrategy } from "src/auth/application/guard/jwt/jwt.strategy"
import { SessionService } from "src/auth/application/service/session.service"
import { ErrorMessage } from "src/common/shared/enum/error-message.enum"
import { User } from "src/user-auth-common/domain/entity/user.entity"
import { MockSessionService } from "test/unit/__mock__/auth/service.mock"
import { MockUserAuthCommonService } from "test/unit/__mock__/user-auth-common/service.mock"
import { TestUser } from "test/unit/user/user.fixtures"

describe('Jwt인증가드(JwtAuthGuard) Test', () => {
    let reflector: Reflector;
    let jwtGuard: JwtAuthGuard;
    let jwtStrategy: JwtStrategy;
    let sessionService: SessionService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                JwtAuthGuard,
                JwtStrategy,
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
            await expect(result).rejects.toThrowError(UnauthorizedException);
        });

        describe('토큰의 유효성 검사를 모두 통과했을 경우', () => {
            it('인증된 사용자가 세션리스트에서 있으면 반환', async() => {
                const user = TestUser.default() as unknown as User;
    
                const mockContext: any = {
                    getHandler: jest.fn(),
                    getClass: jest.fn(),
                    switchToHttp: () => ({
                        getResponse: jest.fn(),
                        getRequest: () => ({
                            user,
                            headers: {
                                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxMDAxNjYzOTAyMn0.z0AfSIZ385LfcGiLQg2qeHUFcf0RfckEA7eE9EaOL24"
                            },
                        })
                    })
                };
    
                jwtStrategy.validate = jest.fn().mockResolvedValueOnce(user);
    
                const sessionCallSpy = jest.spyOn(sessionService, 'getUserFromList').mockResolvedValueOnce('pass');
                const result = await jwtGuard.canActivate(mockContext);
    
                expect(sessionCallSpy).toHaveBeenCalledWith(user.getId());
                expect(result).toBe(true);
            });

            it('인증된 사용자가 세션리스트에서 없으면 401에러', async() => {
                const user = TestUser.default() as unknown as User;
    
                const mockContext: any = {
                    getHandler: jest.fn(),
                    getClass: jest.fn(),
                    switchToHttp: () => ({
                        getResponse: jest.fn(),
                        getRequest: () => ({
                            user,
                            headers: {
                                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxMDAxNjYzOTAyMn0.z0AfSIZ385LfcGiLQg2qeHUFcf0RfckEA7eE9EaOL24"
                            },
                        })
                    })
                };
    
                jwtStrategy.validate = jest.fn().mockResolvedValueOnce(user);
    
                const sessionCallSpy = jest.spyOn(sessionService, 'getUserFromList').mockResolvedValueOnce(null);
                const result = async () => await jwtGuard.canActivate(mockContext);
    
                expect(sessionCallSpy).toHaveBeenCalledWith(user.getId());
                await expect(result).rejects.toThrowError(new UnauthorizedException(ErrorMessage.NotExistUserInSessionList));
            });
        })
    })
})