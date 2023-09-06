import { ConflictException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { AuthMapper } from 'src/auth/application/mapper/auth.mapper';
import { AuthService } from 'src/auth/application/service/auth.service';
import { SessionService } from 'src/auth/application/service/session.service';
import { TokenService } from 'src/auth/application/service/token.service';
import { VerificationUsageService } from 'src/auth/application/service/verification-usage.service';
import { ErrorMessage } from 'src/common/shared/enum/error-message.enum';
import { SmsService } from 'src/notification/sms/application/service/sms.service';
import { UserAuthCommonService } from 'src/user-auth-common/application/user-auth-common.service';
import { NewUserAuthentication } from 'src/user-auth-common/domain/interface/new-user-authentication.interface';
import { RefreshToken } from 'src/user-auth-common/domain/refresh-token';
import { MockPhoneVerificationRepository } from 'test/unit/__mock__/auth/repository.mock';
import { MockAuthenticationCodeService, MockVerificationUsageService, MockTokenService, MockSessionService } from 'test/unit/__mock__/auth/service.mock';
import { MockSmsService } from 'test/unit/__mock__/notification/service.mock';
import { MockUserRepository } from 'test/unit/__mock__/user-auth-common/repository.mock';
import { MockUserAuthCommonService } from 'test/unit/__mock__/user-auth-common/service.mock';
import { UserFixtures } from 'test/unit/user/user.fixtures';

describe('인증 서비스(AuthService) Test', () => {
    let authService: AuthService;
    let smsService: SmsService;
    let tokenService: TokenService;
    let sessionService: SessionService;
    let verificationUsageService: VerificationUsageService;
    let userAuthCommonService: UserAuthCommonService;
    let authMapper: AuthMapper;

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
                MockVerificationUsageService,
                MockPhoneVerificationRepository,
                MockAuthenticationCodeService,
                MockUserAuthCommonService,
                MockUserRepository,
            ]
        }).compile();
        authService = module.get(AuthService);
        smsService = module.get(SmsService);
        tokenService = module.get(TokenService);
        sessionService = module.get(SessionService);
        verificationUsageService = module.get(VerificationUsageService);
        userAuthCommonService = module.get(UserAuthCommonService);
        authMapper = module.get(AuthMapper);
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

    describe('createAuthentication()', () => {
        it('새로 가입된 사용자에게 새로 발급된 인증이 부여되어야 한다', async () => {
            const newUser = UserFixtures.createNewUser();
            expect(newUser.getAuthentication()).toBe(undefined);

            const [newAccessToken, newRefreshKey, newRefreshToken] = ['newAccessToken', 'newRefreshKey', 'newRefreshToken'];
            const newAuthentication = new NewUserAuthentication(newAccessToken, new RefreshToken(newRefreshKey, newRefreshToken));
            newUser.setAuthentication(newAuthentication);

            expect(newUser.getAuthentication().getAccessToken()).toBe(newAccessToken);
            expect(newUser.getAuthentication().getRefreshKey()).toBe(newRefreshKey);
            expect(newUser.getAuthentication().getRefreshToken()).toBe(newRefreshToken);
        });

        it('생성된 토큰을 세션리스트에 추가하기 위해 호출하고, 사용자용 Dto 반환', async() => {
            const testUser = UserFixtures.createNewUser();

            const [newAccessToken, newRefreshKey, newRefreshToken] = ['newAccessToken', 'newRefreshKey', 'newRefreshToken'];
            const newAuthentication = new NewUserAuthentication(newAccessToken, new RefreshToken(newRefreshKey, newRefreshToken));

            jest.spyOn(tokenService, 'generateNewUsersToken').mockResolvedValueOnce(newAuthentication);

            const expectedDto = { name: testUser.getName(), accessToken: newAccessToken, refreshKey: newRefreshKey };
            jest.spyOn(authMapper, 'toDto').mockReturnValueOnce(expectedDto); // 예상 결과값

            const sessionSpy = jest.spyOn(sessionService, 'addUserToList'); // 세션 리스트에 추가되는지

            const result = await authService.createAuthentication(testUser);
            expect(sessionSpy).toHaveBeenCalledWith(testUser.getId(), newAccessToken);
            expect(result).toEqual(expectedDto);
        })
    })

    describe('refreshAuthentication()', () => {
        it('새로 갱신된 토큰을 Session목록에 추가 및 사용자용 Dto 반환', async () => {
            const user = UserFixtures.createDefault();

            const [refreshAccessToken, refreshKey, newRefreshToken] = ['refreshAccessToken', 'newUuid', 'newRefreshToken'];
            const refreshToken = new RefreshToken(refreshKey, newRefreshToken);
            const refreshAuthentication = new NewUserAuthentication(refreshAccessToken, refreshToken);
            
            jest.spyOn(tokenService, 'generateNewUsersToken').mockResolvedValueOnce(refreshAuthentication);

            const expectedDto = { name: user.getName(), accessToken: refreshAccessToken, refreshKey: refreshKey };
            jest.spyOn(authMapper, 'toDto').mockReturnValueOnce(expectedDto); // 예상 결과값

            const sessionSpy = jest.spyOn(sessionService, 'addUserToList')

            const result = await authService.refreshAuthentication(user);
            expect(sessionSpy).toHaveBeenCalledWith(user.getId(), refreshAccessToken);
            expect(result).toEqual(expectedDto);
        });

        it('RefreshToken으로 갱신할 경우 RefreshToken의 key와 값도 새로 발급받아져야 한다', async() => {
            const user = UserFixtures.createDefault();

            const [refreshAccessToken, newUuid, newRefreshToken] = ['refreshAccessToken', 'newUuid', 'newRefreshToken'];
            const refreshToken = new RefreshToken(newUuid, newRefreshToken);
            const refreshAuthentication = new NewUserAuthentication(refreshAccessToken, refreshToken);

            jest.spyOn(tokenService, 'generateNewUsersToken').mockResolvedValueOnce(refreshAuthentication);

            user.refreshAuthentication(refreshAuthentication);

            expect(user.getAuthentication().getAccessToken()).toBe(refreshAccessToken);
            expect(user.getAuthentication().getRefreshKey()).toBe(newUuid);
            expect(user.getAuthentication().getRefreshToken()).toBe(newRefreshToken);
        });
    })
})