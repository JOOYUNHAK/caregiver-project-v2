import { BadRequestException, ConflictException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/application/service/auth.service';
import { ErrorMessage } from 'src/common/shared/enum/error-message.enum';
import { NaverSmsService } from 'src/notification/sms/infra/service/naver-sms.service';
import { SmsService } from 'src/notification/sms/infra/service/sms.service';
import { Phone } from 'src/user-auth-common/domain/entity/user-phone.entity';

describe('인증 서비스(AuthService) Test', () => {
    let authService: AuthService;
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
                        findByPhoneNumber: jest.fn().mockReturnValueOnce(new Phone(1, '01011111111'))
                    }
                },
                {
                    provide: 'REDIS_CLIENT',
                    useValue: {}
                }
            ]
        }).compile();
        authService = module.get(AuthService);
    })
    describe('register()', () => {
        it('잘못된 전화번호 형식이 주어지면 400에러를 던진다', async () => {
            const result = async () => await authService.register('018')
            await expect(result).rejects.toThrowError(new BadRequestException(ErrorMessage.PhoneNumberFormat));
        });

        it('이미 가입되어 있는 전화번호인 경우 409에러를 던진다', async () => {
            const result = async () => await authService.register('01011111111');
            await expect(result).rejects.toThrowError(new ConflictException(ErrorMessage.DuplicatedPhoneNumber));
        })
    })
})