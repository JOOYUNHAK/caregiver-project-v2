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

        it('기존 인증 사용내역이 null이면 새로 내역을 생성하여 횟수를 증가시킨 이후 저장한다',async () => {
            const phoneNumber = '01012345678';
            const testUsage = new PhoneVerificationUsage();
            testUsage.addHistory();

            jest.spyOn(verificationUsageService, 'getPhoneUsageHistory').mockResolvedValue(null);
            const saveSpy = jest.spyOn(mockPhoneVerificationRepo, 'save').mockResolvedValue(null);
            await verificationUsageService.addPhoneUsageHistory(phoneNumber);

            expect(saveSpy).toBeCalledWith(phoneNumber, testUsage);
        })
    });

    describe('addPhoneCodeAttemp()', () => {
        it('각 인증번호당 시도횟수가 한번 증가해야된다.', () => {
            const beforeCodeAttemp = 2;
            const testPhoneVerificationUsage = new PhoneVerificationUsage(0, beforeCodeAttemp);
            testPhoneVerificationUsage.addCodeAttemp();
            expect(testPhoneVerificationUsage.getCodeAttemp()).toBe(3);
        });
    })
})