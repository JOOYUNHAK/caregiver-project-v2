import { ConflictException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { AuthMapper } from 'src/auth/application/mapper/auth.mapper';
import { AuthService } from 'src/auth/application/service/auth.service';
import { SessionService } from 'src/auth/application/service/session.service';
import { TokenService } from 'src/auth/application/service/token.service';
import { VerificationUsageService } from 'src/auth/application/service/verification-usage.service';
import { ErrorMessage } from 'src/common/shared/enum/error-message.enum';
import { NaverSmsService } from 'src/notification/sms/infra/service/naver-sms.service';
import { SmsService } from 'src/notification/sms/infra/service/sms.service';
import { UserAuthCommonService } from 'src/user-auth-common/application/user-auth-common.service';
import { Token } from 'src/user-auth-common/domain/entity/auth-token.entity';
import { User } from 'src/user-auth-common/domain/entity/user.entity';
import { LOGIN_TYPE, ROLE } from 'src/user-auth-common/domain/enum/user.enum';
import { NewUserAuthentication } from 'src/user-auth-common/domain/interface/new-user-authentication.interface';
import { RefreshToken } from 'src/user-auth-common/domain/refresh-token';
import { MockPhoneVerificationRepository } from 'test/unit/__mock__/auth/repository.mock';
import { MockAuthenticationCodeService, MockVerificationUsageService, MockTokenService, MockSessionService } from 'test/unit/__mock__/auth/service.mock';
import { MockSmsService } from 'test/unit/__mock__/notification/service.mock';
import { MockUserRepository } from 'test/unit/__mock__/user-auth-common/repository.mock';
import { MockUserAuthCommonService } from 'test/unit/__mock__/user-auth-common/service.mock';
import { TestUser } from 'test/unit/user/user.fixtures';

describe('인증 서비스(AuthService) Test', () => {
    let authService: AuthService;
    let smsService: SmsService;
    let tokenService: TokenService;
    let sessionService: SessionService;
    let verificationUsageService: VerificationUsageService;
    let userAuthCommonService: UserAuthCommonService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ConfigModule],
            providers: [
                {
                    provide: 'REDIS_CLIENT',
                    useValue: {}
                },
                {
                    provide: AuthMapper,
                    useValue: { toDto: jest.fn() }
                },
                AuthService,
                MockSmsService,
                MockTokenService,
                MockSessionService,
                NaverSmsService,
                MockVerificationUsageService,
                MockPhoneVerificationRepository,
                MockAuthenticationCodeService,
                MockUserAuthCommonService,
                MockUserRepository
            ]
        }).compile();
        authService = module.get(AuthService);
        smsService = module.get(SmsService);
        tokenService = module.get(TokenService);
        sessionService = module.get(SessionService);
        verificationUsageService = module.get(VerificationUsageService);
        userAuthCommonService = module.get(UserAuthCommonService);
    });

    beforeEach( () => jest.clearAllMocks() );
    describe('register()', () => {
        it('이미 가입되어 있는 전화번호인 경우 409에러를 던진다', async () => {
            jest.spyOn(userAuthCommonService, 'checkExistingUserByPhone').mockResolvedValue(true)
            const result = async () => await authService.register('01011111111');
            await expect(result).rejects.toThrowError(new ConflictException(ErrorMessage.DuplicatedPhoneNumber));
        })
    });

    describe('login()', () => {
        it('이미 가입된 사용자의 휴대폰이면 \'exist\'를 반환한다.', async () => {
            jest.spyOn(smsService, 'send').mockResolvedValue(null);
            jest.spyOn(userAuthCommonService, 'checkExistingUserByPhone').mockResolvedValue(true);
            const result = await authService.login('01011112222');

            expect(result).toBe('exist')
        });

        it('새로 가입된 사용자의 휴대폰이면 \'newuser\'를 반환한다.', async () => {
            jest.spyOn(smsService, 'send').mockResolvedValue(null);
            jest.spyOn(userAuthCommonService, 'checkExistingUserByPhone').mockResolvedValue(false);
            const result = await authService.login('01011112222');

            expect(result).toBe('newuser')
        });

        it('휴대폰인증 사용내역을 1회 추가해야 한다.', async () => {
            const verificationUsageSpy = jest.spyOn(verificationUsageService, 'addPhoneUsageHistory').mockReturnValueOnce(null);
            await authService.login('01022334444');

            expect(verificationUsageSpy).toBeCalledTimes(1);
        });
    });

    describe('createAuthenticationToUser()', () => {
        it('새로운 AccessToken을 변경하고 Session목록에 추가하기 위해 서비스 호출', async () => {
            const [existAccessToken, existRefreshKey, existRefreshToken] = ['accessToken', 'uuid', 'existRefreshToken'];
            const existAuthentication = new Token(existAccessToken, existRefreshKey, existRefreshToken);
            const user = TestUser.default().withToken(existAuthentication);

            jest.spyOn(tokenService, 'generateAccessToken').mockResolvedValueOnce('accessToken');
            const sessionServiceSpy = jest.spyOn(sessionService, 'addUserToList').mockResolvedValueOnce(null);

            await authService.createAuthenticationToUser(user as unknown as User);
            expect(sessionServiceSpy).toBeCalledTimes(1);
        });

        it('새로운 AccessToken으로 변경할때는 AccessToken만 변경되고, RefreshToken은 기존 값이어야 한다', async() => {
            const [existAccessToken, existRefreshKey, existRefreshToken] = ['accessToken', 'uuid', 'existRefreshToken'];
            const existAuthentication = new Token(existAccessToken, existRefreshKey, existRefreshToken);
            const user = TestUser.default().withToken(existAuthentication);

            const newAccessToken = 'newAccessToken';
            
            jest.spyOn(tokenService, 'generateAccessToken').mockResolvedValueOnce(newAccessToken);
            user.changeAuthentication(newAccessToken);

            expect(user.getAuthentication().getAccessToken()).toBe(newAccessToken);
            expect(user.getAuthentication().getRefreshKey()).toBe('uuid');
            expect(user.getAuthentication().getRefreshToken()).toBe('existRefreshToken');
        });
    })

    describe('refreshAuthentication()', () => {
        it('RefreshToken으로 갱신할 경우 RefreshToken의 key와 값도 새로 발급받아져야 한다', async() => {
            const [existAccessToken, existRefreshKey, existRefreshToken] = ['accessToken', 'uuid', 'existRefreshToken'];
            const existAuthentication = new Token(existAccessToken, existRefreshKey, existRefreshToken);
            const user = TestUser.default().withToken(existAuthentication);

            const [refreshAccessToken, newUuid, newRefreshToken] = ['refreshAccessToken', 'newUuid', 'newRefreshToken'];
            const refreshToken = new RefreshToken(newUuid, newRefreshToken);
            const refreshAuthentication = new NewUserAuthentication(refreshAccessToken, refreshToken);

            jest.spyOn(tokenService, 'generateNewUsersToken').mockResolvedValueOnce(refreshAuthentication);

            await authService.refreshAuthentication(user as unknown as User);
            expect(user.getAuthentication().getAccessToken()).toBe(refreshAccessToken);
            expect(user.getAuthentication().getRefreshKey()).toBe(newUuid);
            expect(user.getAuthentication().getRefreshToken()).toBe(newRefreshToken);
        })
    })
})