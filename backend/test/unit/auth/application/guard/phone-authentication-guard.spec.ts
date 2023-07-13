import { ForbiddenException } from "@nestjs/common";
import { PhoneAuthenticationSendGuard } from "src/auth/application/guard/authentication-send.guard";
import { VerificationUsageService } from "src/auth/application/service/verification-usage.service";
import { PhoneVerificationUsage } from "src/auth/domain/entity/phone-verification-usage.entity";

describe('휴대폰인증 발송 가드(PhoneAuthenticationGuard) Test', () => {
    const blockedAt = new Date();

    const mockContext: any = {
        switchToHttp: () => ({
            getRequest: () => ({
                body: { phoneNumber: '01011111111' },
            }),
        }),
    }
    const mockPhoneVerificationService = {
        getPhoneUsageHistory: jest.fn()
                               .mockResolvedValueOnce(new PhoneVerificationUsage(5, 0))
                               .mockResolvedValueOnce(new PhoneVerificationUsage(0, 0))
    } as unknown as VerificationUsageService;

    const guard = new PhoneAuthenticationSendGuard(mockPhoneVerificationService);

    it('일일 발송 제한을 넘었다면 403에러', async () => {
        const result = async () => await guard.canActivate(mockContext);
        await expect(result).rejects.toThrowError(new ForbiddenException(`일일 가능한 인증횟수를 초과하였습니다.`))
    });

    it('일일 발송 제한을 넘지 않았다면 True', async () => {
        const result = await guard.canActivate(mockContext);
        expect(result).toBe(true);
    });
})