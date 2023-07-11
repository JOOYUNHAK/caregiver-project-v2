import { ForbiddenException } from "@nestjs/common";

export class PhoneVerificationUsage {

    private dayAttemp: number;

    private codeAttemp: number;

    constructor(dayAttemp: number = 0, codeAttemp: number = 0, blockedAt: string = null) {
        this.dayAttemp = dayAttemp;
        this.codeAttemp = codeAttemp;
    }

    getDayAttemp(): number { return this.dayAttemp; };

    /* 일일 가능횟수 */
    dayAttempCheck(): void {
        if( this.dayAttemp == 5 )
            throw new ForbiddenException(
                `일일 가능한 인증횟수를 초과하였습니다.`
            );
    };

    /* 사용내역 추가 */
    addHistory() {
        this.dayAttemp += 1;
    };

    /* redis에 메소드는 저장될 필요가 없으므로 */
    toSerializedString(): string {
        return JSON.stringify({ 
            dayAttemp: this.dayAttemp,
            codeAttemp: this.codeAttemp,
        });
    };
};