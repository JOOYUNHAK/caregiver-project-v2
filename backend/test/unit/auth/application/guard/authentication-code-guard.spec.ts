import { NotFoundException, UnauthorizedException } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { PhoneAuthenticationCodeGuard } from "src/auth/application/guard/authentication-code.guard"
import { AuthenticationCodeService } from "src/auth/application/service/authentication-code.service"
import { VerificationUsageService } from "src/auth/application/service/verification-usage.service"
import { AuthenticationCode } from "src/auth/domain/authentication-code"
import { PhoneVerificationUsage } from "src/auth/domain/entity/phone-verification-usage.entity"
import { ErrorMessage } from "src/common/shared/enum/error-message.enum"
import { MockAuthenticationCodeService, MockVerificationUsageService } from "test/unit/__mock__/auth/service.mock"
import { MockUserRepository } from "test/unit/__mock__/user-auth-common/repository.mock"

describe('인증코드 관련 가드(AuthenticationCodeGuard) Test', () => {
    let verificationUsgaeService: VerificationUsageService;
    let authenticationCodeService: AuthenticationCodeService;
    let guard: PhoneAuthenticationCodeGuard;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                MockUserRepository,
                MockVerificationUsageService,
                MockAuthenticationCodeService,
                PhoneAuthenticationCodeGuard,
                {
                    provide: 'REDIS_CLIENT',
                    useValue: {
                        GET: jest.fn()
                    }
                }
            ]
        }).compile();

        verificationUsgaeService = module.get(VerificationUsageService);
        authenticationCodeService = module.get(AuthenticationCodeService);
        guard = module.get(PhoneAuthenticationCodeGuard);
    });

    const [phoneNumber, code] = ['01012345667', 232222];

    const mockContext: any = {
        switchToHttp: () => ({
            getRequest: () => ({
                body: { phoneNumber, code, isNewUser: false },
            }),
        }),
    };
    it('현재 인증번호의 시도횟수가 초과됐으면 403에러', async() => {
        
        jest.spyOn(verificationUsgaeService, 'getPhoneUsageHistory')
            .mockResolvedValueOnce(new PhoneVerificationUsage(1, 3));
        
        const result = async () => await guard.canActivate(mockContext);

        await expect(result).rejects.toThrowError(new NotFoundException(ErrorMessage.ExceededCodeAttempLimit));
    });

    it('코드가 일치하지 않으면 401에러', async () => {
        jest.spyOn(authenticationCodeService, 'getPhoneCode')
            .mockResolvedValueOnce(new AuthenticationCode(201920));
        
        jest.spyOn(verificationUsgaeService, 'getPhoneUsageHistory')
            .mockResolvedValueOnce(new PhoneVerificationUsage(1, 1));
        
        const result = async () => await guard.canActivate(mockContext);
        await expect(result).rejects.toThrowError(new UnauthorizedException(
            `인증번호가 일치하지 않습니다.2회 남음`
        ))
    });
})