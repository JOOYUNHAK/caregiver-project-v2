import { Message } from "../../domain/message";

export interface ISMSService {
    /* 문자 발송 */
    send(smsMessage: Message): Promise<void>
};
