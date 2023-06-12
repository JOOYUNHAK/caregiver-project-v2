import { AuthenticationCodeMessage } from "src/auth/domain/authentication-code-message";

export interface ISMSService {
    /* 문자 발송 */
    send(smsMessage: AuthenticationCodeMessage): Promise<void>
};
