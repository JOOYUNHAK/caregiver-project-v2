import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing"
import { RedisClusterType } from "redis"
import { AuthenticationCodeService } from "src/auth/application/service/authentication-code.service"
import { AuthenticationCode } from "src/auth/domain/authentication-code";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";

describe('인증코드 관리 서비스(AuthenticationCodeService) Test', () => {
    let authenticationCodeService: AuthenticationCodeService,
        redis: RedisClusterType;

    beforeAll(async() => {
        const module = await Test.createTestingModule({
            providers: [
                AuthenticationCodeService,
                {
                    provide: 'REDIS_CLIENT',
                    useValue:{
                        GET: jest.fn()
                    }
                }
            ]
        }).compile();
        authenticationCodeService = module.get(AuthenticationCodeService);
        redis = module.get('REDIS_CLIENT');
    });

    describe('getPhoneCode()', () => {
        const phoneNumber = '01011123456';
        it('해당 휴대폰번호의 인증코드가 존재하지 않으면 404에러', async () => {
            jest.spyOn(redis, 'GET').mockResolvedValueOnce(null);
            const result = async () => await authenticationCodeService.getPhoneCode(phoneNumber);
            await expect(result).rejects.toThrowError(new NotFoundException(ErrorMessage.ExpiredSmsCode));
        });

        it('해당 휴대폰번호의 인증코드가 존재하면 AuthenticationCode객체가 반환', async () => {
            jest.spyOn(redis, 'GET').mockResolvedValueOnce('242333');
            const result = await authenticationCodeService.getPhoneCode(phoneNumber);
            
            expect(result).toBeInstanceOf(AuthenticationCode);
            expect(result.getCode()).toBe(242333);
        });
    })
})