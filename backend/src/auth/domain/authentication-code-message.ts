import { Message } from "src/notification/sms/domain/message";

export class AuthenticationCodeMessage extends Message {
    private authenticationCode: number;
    constructor(phoneNumber: string) { 
        super(phoneNumber); 
        /* 6자리 인증번호 생성 */
        this.authenticationCode = Math.floor(Math.random() * 900000 + 100000);
        this.content = `[믿음으로]\n인증번호 [${this.authenticationCode}]를 입력해주세요.`
    };  

    getAuthenticationCode(): number { return this.authenticationCode; };
};