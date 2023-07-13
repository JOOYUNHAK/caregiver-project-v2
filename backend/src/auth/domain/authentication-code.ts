import { UnauthorizedException } from "@nestjs/common";

export class AuthenticationCode {
    private code: number;
    constructor(code: number) {
        this.code = code;
    };
    
    verify(inputCode: number, remainChance: number): void {
        if( this.code != inputCode )
            throw new UnauthorizedException(
                `인증번호가 일치하지 않습니다.${remainChance}회 남음`
            );    
    }
    /* 수정 요망 */
    isEqual(inputCode: number): boolean { return inputCode == this.code; };
    getCode(): number { return this.code; };
}