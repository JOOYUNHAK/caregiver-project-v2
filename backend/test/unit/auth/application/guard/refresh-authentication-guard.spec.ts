import { ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { RefreshAuthenticationGuard } from "src/auth/application/guard/refresh-authentication.guard"
import { ErrorMessage } from "src/common/shared/enum/error-message.enum"
import { User } from "src/user-auth-common/domain/entity/user.entity"
import { UserRepository } from "src/user-auth-common/domain/repository/user.repository"
import { MockJwtService } from "test/unit/__mock__/auth/service.mock"
import { MockUserRepository } from "test/unit/__mock__/user-auth-common/repository.mock"
import { TestUser } from "test/unit/user/user.fixtures"

describe('인증 갱신 가드(RefreshAuthenticationGuard) Test', () => {
    let userRepository: UserRepository,
            jwtService: JwtService,
            refreshAuthenticationGuard: RefreshAuthenticationGuard;
    
    beforeAll( async() => {
        const module = await Test.createTestingModule({
            providers: [
                MockUserRepository,
                MockJwtService,
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

        it('조회된 RefreshToken의 유효성검사를 통과하지 못하면 401 에러', async() => {
            const mockContext = {
                switchToHttp: () => ({
                    getRequest: () => ({
                        body: {
                            refreshKey: 'refreshKey'
                        }
                    })
                })
            } as ExecutionContext;


            const testUser = TestUser.default();

            jest.spyOn(userRepository, 'findByRefreshKey').mockResolvedValueOnce(testUser as unknown as User);
            jest.spyOn(jwtService, 'verifyAsync').mockRejectedValueOnce(new UnauthorizedException('검증실패'));

            const result = async () => await refreshAuthenticationGuard.canActivate(mockContext);
            await expect(result).rejects.toThrowError(new UnauthorizedException('검증실패'))
        });


    })
})