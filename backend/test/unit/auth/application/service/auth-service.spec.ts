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
import { User } from 'src/user-auth-common/domain/entity/user.entity';
import { LOGIN_TYPE, ROLE } from 'src/user-auth-common/domain/enum/user.enum';
import { MockPhoneVerificationRepository } from 'test/unit/__mock__/auth/repository.mock';
import { MockAuthenticationCodeService, MockVerificationUsageService, MockTokenService, MockSessionService } from 'test/unit/__mock__/auth/service.mock';
import { MockSmsService } from 'test/unit/__mock__/notification/service.mock';
import { MockUserAuthCommonService } from 'test/unit/__mock__/user-auth-common/service.mock';

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
                MockUserAuthCommonService
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
        it('새로운 AccessToken을 발급받고 Session목록에 추가하기 위해 서비스 호출', async () => {
            const user = new User('테스트', ROLE.CAREGIVER, LOGIN_TYPE.PHONE, null, null, null, null);
            expect(await user.getAuthentication()).toBe(null);

            jest.spyOn(tokenService, 'generateAccessToken').mockResolvedValueOnce('accessToken');
            const sessionServiceSpy = jest.spyOn(sessionService, 'addUserToList').mockResolvedValueOnce(null);

            await authService.createAuthenticationToUser(user);

            expect(await user.getAuthentication()).not.toBe(null);
            expect((await user.getAuthentication()).getAccessToken()).toBe('accessToken');
            expect(sessionServiceSpy).toBeCalledTimes(1);
        });
    })
})