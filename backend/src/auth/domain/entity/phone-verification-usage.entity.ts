import { ForbiddenException } from "@nestjs/common";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";

export class PhoneVerificationUsage {
    private readonly MAX_CHANCE_PER_CODE = 3;
    private readonly MAX_DAILY_SEND_LIMIT = 5;
    
    private dayAttemp: number;

    private codeAttemp: number;

    constructor(dayAttemp: number = 0, codeAttemp: number = 0, blockedAt: string = null) {
        this.dayAttemp = dayAttemp;
        this.codeAttemp = codeAttemp;
    }

    getDayAttemp(): number { return this.dayAttemp; };
    getCodeAttemp(): number { return this.codeAttemp; };
    remainChancePerCode(): number { return this.MAX_CHANCE_PER_CODE - this.codeAttemp; }; // 현재 인증번호의 남은 시도횟수

    /* 일일 가능횟수 */
    dayAttempCheck(): void {
        if( this.dayAttemp == this.MAX_DAILY_SEND_LIMIT )
            throw new ForbiddenException(ErrorMessage.ExceededPhoneDailyLimit);
    };

    /* 사용내역 추가 */
    addHistory() {
        this.dayAttemp += 1;
        this.resetCodeAttemp();
    };

    /* 인증번호당 시도횟수 */
    codeAttempCheck(): void {
        if( this.codeAttemp == 3 )
            throw new ForbiddenException(ErrorMessage.ExceededCodeAttempLimit);
    };

    addCodeAttemp(): void { this.codeAttemp += 1; };

    /* redis에 메소드는 저장될 필요가 없으므로 */
    toSerializedString(): string {
        return JSON.stringify({ 
            dayAttemp: this.dayAttemp,
            codeAttemp: this.codeAttemp,
        });
    };

    /* 새로 인증번호를 발송하면 이전 시도횟수 초기화 */
    private resetCodeAttemp(): void { this.codeAttemp = 0; };
};