import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/application/service/auth.service';
import { VerificationUsageService } from 'src/auth/application/service/verification-usage.service';
import { AuthenticationCode } from 'src/auth/domain/authentication-code';
import { PhoneVerificationRepository } from 'src/auth/infra/repository/phone-verification.repository';
import { ErrorMessage } from 'src/common/shared/enum/error-message.enum';
import { NaverSmsService } from 'src/notification/sms/infra/service/naver-sms.service';
import { SmsService } from 'src/notification/sms/infra/service/sms.service';
import { Phone } from 'src/user-auth-common/domain/entity/user-phone.entity';
import { PhoneRepository } from 'src/user-auth-common/domain/repository/user-phone.repository';

describe('인증 서비스(AuthService) Test', () => {
    let authService: AuthService;
    let smsService: SmsService;
    let phoneRepository: PhoneRepository;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ConfigModule],
            providers: [
                AuthService,
                SmsService,
                NaverSmsService,
                {
                    provide: VerificationUsageService,
                    useValue: {
                        addPhoneUsageHistory: jest.fn()
                    }
                },
                {
                    provide: PhoneVerificationRepository,
                    useValue: {}
                },
                {
                    provide: getRepositoryToken(Phone),
                    useValue: {
                        findByPhoneNumber: jest.fn()
                    }
                },
                {
                    provide: 'REDIS_CLIENT',
                    useValue: {}
                }
            ]
        }).compile();
        authService = module.get(AuthService);
        smsService = module.get(SmsService);
        phoneRepository = module.get(getRepositoryToken(Phone));
    })
    describe('register()', () => {
        it('이미 가입되어 있는 전화번호인 경우 409에러를 던진다', async () => {
            jest.spyOn(phoneRepository, 'findByPhoneNumber').mockResolvedValue(new Phone('01011111111'))
            const result = async () => await authService.register('01011111111');
            await expect(result).rejects.toThrowError(new ConflictException(ErrorMessage.DuplicatedPhoneNumber));
        })
    });

    describe('validateSmsCode()', () => {
        beforeEach(() => {
            jest.spyOn(smsService, 'getAuthenticationCode').mockResolvedValueOnce(new AuthenticationCode(222333));
        })

        it('입력한 인증번호가 다르면 401에러를 던진다.', async () => {
            const result = authService.validateSmsCode({ phoneNumber: '01011111111', code: 111111});
            
            await expect(result).rejects.toThrowError(new UnauthorizedException(ErrorMessage.NotMatchedAuthenticationCode));
        });

        it('입력한 인증번호와 일치하면 반환값이 없다', async () => {
            const result = authService.validateSmsCode({ phoneNumber: '01011111111', code: 222333});
            
            await expect(result).resolves.toBe(undefined);
        })
    });

    describe('login()', () => {
        it('이미 가입된 사용자의 휴대폰이면 \'exist\'를 반환한다.', async () => {
            jest.spyOn(smsService, 'send').mockResolvedValue(null);
            jest.spyOn(phoneRepository, 'findByPhoneNumber').mockResolvedValue(new Phone('01011112222'));
            const result = await authService.login('01011112222');

            expect(result).toBe('exist')
        });

        it('새로 가입된 사용자의 휴대폰이면 \'newuser\'를 반환한다.', async () => {
            jest.spyOn(smsService, 'send').mockResolvedValue(null);
            jest.spyOn(phoneRepository, 'findByPhoneNumber').mockResolvedValue(null);
            const result = await authService.login('01011112222');

            expect(result).toBe('newuser')
        })
    })
})