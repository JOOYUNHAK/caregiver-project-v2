import { ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { RefreshAuthenticationGuard } from "src/auth/application/guard/refresh-authentication.guard"
import { ErrorMessage } from "src/common/shared/enum/error-message.enum"
import { Token } from "src/user-auth-common/domain/entity/auth-token.entity"
import { User } from "src/user-auth-common/domain/entity/user.entity"
import { UserRepository } from "src/user-auth-common/domain/repository/user.repository"
import { MockUserRepository } from "test/unit/__mock__/user-auth-common/repository.mock"
import { TestUser } from "test/unit/user/user.fixtures"

describe('인증 갱신 가드(RefreshAuthenticationGuard) Test', () => {
    let userRepository: UserRepository,
            jwtService: JwtService,
            configService: ConfigService,
            refreshAuthenticationGuard: RefreshAuthenticationGuard;
    
    beforeAll( async() => {
        const module = await Test.createTestingModule({
            providers: [
                MockUserRepository,
                JwtService,
                RefreshAuthenticationGuard,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn((key: string) => {
                            switch(key) {
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
            ]
        }).compile();
        
        userRepository = module.get(getRepositoryToken(User));
        configService = module.get(ConfigService);
        jwtService = module.get(JwtService);
        refreshAuthenticationGuard = module.get(RefreshAuthenticationGuard);
    })

    describe('canActivate()', () => {
        it('요청에 RefreshKey가 없으면 401 에러', async() => {
            const mockContext = {
                switchToHttp: () => ({
                    getRequest: () => ({
                        body: {}
                    })
                })
            } as ExecutionContext;
            
            const result = async () => await refreshAuthenticationGuard.canActivate(mockContext);
            await expect(result).rejects.toThrowError(new UnauthorizedException(ErrorMessage.NotExistRefreshKeyInRequest));
        });

        it('해당 RefreshKey를 가진 사용자가 없으면 401에러', async() => {
            const mockContext = {
                switchToHttp: () => ({
                    getRequest: () => ({
                        body: {
                            refreshKey: 'refreshKey'
                        }
                    })
                })
            } as ExecutionContext;

            jest.spyOn(userRepository, 'findByRefreshKey').mockResolvedValueOnce(null);

            const result = async () => await refreshAuthenticationGuard.canActivate(mockContext);
            await expect(result).rejects.toThrowError(new UnauthorizedException(ErrorMessage.InvalidRefreshKey));
        });

        it('조회된 RefreshToken의 signature가 일치하지 않으면 401 에러', async() => {
            const mockContext = {
                switchToHttp: () => ({
                    getRequest: () => ({
                        body: {
                            refreshKey: 'refreshKey'
                        }
                    })
                })
            } as ExecutionContext;

            /* 잘못 서명된 토큰을 만들고 Test */
            const wrongSecretKey = 'wrongSecretKey';
            const refreshToken = await jwtService.signAsync({}, {
                secret: wrongSecretKey,
                expiresIn: '100d'
            });

            const wrongRefreshToken = new Token(null, null, refreshToken);
            const testUser = TestUser.default().withToken(wrongRefreshToken);

            jest.spyOn(userRepository, 'findByRefreshKey').mockResolvedValueOnce(testUser as unknown as User);

            const result = async () => await refreshAuthenticationGuard.canActivate(mockContext);
            await expect(result).rejects.toThrowError(new UnauthorizedException('invalid signature'))
        });

        it('조회된 RefreshToken이 만료되었으면 401 에러', async() => {
            const mockContext = {
                switchToHttp: () => ({
                    getRequest: () => ({
                        body: {
                            refreshKey: 'refreshKey'
                        }
                    })
                })
            } as ExecutionContext;

            /* 바로 만료되는 토큰을 만들고 Test */
            const testTime = '0s';
            const refreshToken = await jwtService.signAsync({}, {
                secret: configService.get('jwt.refreshToken.secret'),
                expiresIn: testTime
            });

            const expiredRfreshToken = new Token(null, null, refreshToken);
            const testUser = TestUser.default().withToken(expiredRfreshToken);

            jest.spyOn(userRepository, 'findByRefreshKey').mockResolvedValueOnce(testUser as unknown as User);

            const result = async () => await refreshAuthenticationGuard.canActivate(mockContext);
            await expect(result).rejects.toThrowError(new UnauthorizedException('jwt expired'))
        });
    })
})