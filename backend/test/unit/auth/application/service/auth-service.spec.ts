import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/application/service/auth.service';
import { AuthenticationCode } from 'src/auth/domain/authentication-code';
import { ErrorMessage } from 'src/common/shared/enum/error-message.enum';
import { NaverSmsService } from 'src/notification/sms/infra/service/naver-sms.service';
import { SmsService } from 'src/notification/sms/infra/service/sms.service';
import { Phone } from 'src/user-auth-common/domain/entity/user-phone.entity';

describe('인증 서비스(AuthService) Test', () => {
    let authService: AuthService;
    let smsService: SmsService;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ConfigModule],
            providers: [
                AuthService,
                SmsService,
                NaverSmsService,
                {
                    provide: getRepositoryToken(Phone),
                    useValue: {
                        findByPhoneNumber: jest.fn().mockReturnValueOnce(new Phone('01011111111'))
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
    })
    describe('register()', () => {
        it('이미 가입되어 있는 전화번호인 경우 409에러를 던진다', async () => {
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
    })
})