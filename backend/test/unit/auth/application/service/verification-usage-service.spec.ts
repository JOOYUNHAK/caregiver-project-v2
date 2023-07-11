import { VerificationUsageService } from "src/auth/application/service/verification-usage.service";
import { PhoneVerificationUsage } from "src/auth/domain/entity/phone-verification-usage.entity";
import { PhoneVerificationRepository } from "src/auth/infra/repository/phone-verification.repository"

describe('인증 사용 내역 서비스(VerificationUsageService) Test', () => {
    const mockPhoneVerificationRepo = {
        save: jest.fn()
    } as unknown as PhoneVerificationRepository;

    const verificationUsageService = new VerificationUsageService(mockPhoneVerificationRepo);

    describe('addPhoneUsageHistory()', () => {
        it('휴대폰인증 일일 사용내역이 한번 증가해야된다', () => {
            const testUsage = new PhoneVerificationUsage(2);
            testUsage.addHistory();

            expect(testUsage.getDayAttemp()).toBe(3);
        });

        it('기존 인증 사용내역이 null이면 새로 내역을 생성하여 저장한다',async () => {
            jest.spyOn(verificationUsageService, 'getPhoneUsageHistory').mockResolvedValue(null);
            const saveSpy = jest.spyOn(mockPhoneVerificationRepo, 'save').mockResolvedValue(null);
            await verificationUsageService.addPhoneUsageHistory('01012345678');

            expect(saveSpy).toBeCalledWith('01012345678', { codeAttemp: 0, dayAttemp: 1 });
        })
    })
})