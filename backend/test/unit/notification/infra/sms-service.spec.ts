import { UnauthorizedException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { RedisClientType } from "redis";
import { AuthenticationCode } from "src/auth/domain/authentication-code";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { NaverSmsService } from "src/notification/sms/infra/service/naver-sms.service";
import { SmsService } from "src/notification/sms/infra/service/sms.service"

describe('SMS 서비스(SmsService) Test', () => {
    let smsService: SmsService;
    let redis: RedisClientType;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ConfigModule],
            providers: [
                SmsService,
                NaverSmsService,
                {
                    provide: 'REDIS_CLIENT',
                    useValue: {
                        GET: jest.fn()
                    }
                }
            ]
        }).compile();

        smsService = module.get(SmsService);
        redis = module.get('REDIS_CLIENT');
    });

    describe('getAuthenticationCode()', () => {
        it('코드가 존재하지 않으면 유효시간이 지났다는 에러를 던진다', async () => {
            jest.spyOn(redis, 'GET').mockReturnValueOnce(null);
            const result = smsService.getAuthenticationCode('01011111111');
            
            await expect(result).rejects.toThrowError(new UnauthorizedException(ErrorMessage.ExpiredSmsCode));
        });

        it('코드가 존재하면 인증코드 객체가 만들어져 반환된다', async () => {
            jest.spyOn(redis, 'GET').mockResolvedValueOnce('222333');
            const existAuthenticationCode = await redis.GET('phone:01011111111:code');
            const authenticationCode = new AuthenticationCode(parseInt(existAuthenticationCode));

            expect(authenticationCode.getCode()).toBe(222333);
        })
    })
})