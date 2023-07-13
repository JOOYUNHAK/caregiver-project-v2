import { ForbiddenException } from "@nestjs/common";
import { PhoneVerificationUsage } from "src/auth/domain/entity/phone-verification-usage.entity"
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";


describe('휴대폰인증 사용내역 객체(PhoneVerificationUsage) Test', () => {
    let testPhoneVerificationUsage: PhoneVerificationUsage;

    it('일일 발송 가능 횟수를 모두 사용했으면 403에러', () => {
        const sendAttemp = 5;
        testPhoneVerificationUsage = new PhoneVerificationUsage(sendAttemp);

        expect(() => testPhoneVerificationUsage.dayAttempCheck()).toThrowError(
            new ForbiddenException(ErrorMessage.ExceededPhoneDailyLimit)
        );
    });

    it('발송을 할 때마다 발송횟수는 증가하고 인증코드 시도횟수는 초기화', () => {
        const sendAttemp = 2, codeAttemp = 3;
        testPhoneVerificationUsage = new PhoneVerificationUsage(sendAttemp, codeAttemp);
        testPhoneVerificationUsage.addHistory();

        expect(testPhoneVerificationUsage.getDayAttemp()).toBe(3);
        expect(testPhoneVerificationUsage.getCodeAttemp()).toBe(0);
    });

    it('인증번호당 시도가능한 횟수를 초과하면 403에러', () => {
        const codeAttemp = 3;
        testPhoneVerificationUsage = new PhoneVerificationUsage(0, codeAttemp);

        expect(() => testPhoneVerificationUsage.codeAttempCheck()).toThrowError(
            new ForbiddenException(ErrorMessage.ExceededCodeAttempLimit)
        );
    });

    it('인증코드 검증을 할 때마다 코드시도 횟수 증가', () => {
        const codeAttemp = 2;
        testPhoneVerificationUsage = (new PhoneVerificationUsage(0, codeAttemp));
        testPhoneVerificationUsage.addCodeAttemp();

        expect(testPhoneVerificationUsage.getCodeAttemp()).toBe(3);
    });

    it('Plain Object를 문자열로 변경하여 반환', () => {
        const dayAttemp = 3, codeAttemp = 3;
        const serializedString = JSON.stringify({ dayAttemp, codeAttemp });
        testPhoneVerificationUsage = new PhoneVerificationUsage(dayAttemp, codeAttemp);
        
        expect(testPhoneVerificationUsage.toSerializedString()).toBe(serializedString);
    });
})