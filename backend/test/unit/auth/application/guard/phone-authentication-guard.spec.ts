import { ForbiddenException } from "@nestjs/common";
import { PhoneAuthenticationSendGuard } from "src/auth/application/guard/authentication-send.guard";
import { PhoneVerificationUsage } from "src/auth/domain/entity/phone-verification-usage.entity";
import { PhoneVerificationRepository } from "src/auth/infra/repository/phone-verification.repository";

describe('휴대폰인증 발송 가드(PhoneAuthenticationGuard) Test', () => {
    const blockedAt = new Date();

    const mockContext: any = {
        switchToHttp: () => ({
            getRequest: () => ({
                body: { phoneNumber: '01011111111' },
            }),
        }),
    }
    const mockPhoneVerificationRepo = {
        findByPhoneNumber: jest.fn()
                               .mockResolvedValueOnce(new PhoneVerificationUsage(5, 0, blockedAt))
                               .mockResolvedValueOnce(new PhoneVerificationUsage(0, 0, null))
    } as unknown as PhoneVerificationRepository;

    const guard = new PhoneAuthenticationSendGuard(mockPhoneVerificationRepo);

    it('일일 발송 제한을 넘었다면 403에러', async () => {
        const result = async () => await guard.canActivate(mockContext);
        await expect(result).rejects.toThrowError(new ForbiddenException(`일일 가능한 인증횟수를 초과하였습니다. ${blockedAt}이후에 다시 시도해 주세요.`))
    });

    it('일일 발송 제한을 넘지 않았다면 True', async () => {
        const result = await guard.canActivate(mockContext);
        expect(result).toBe(true);
    });
})