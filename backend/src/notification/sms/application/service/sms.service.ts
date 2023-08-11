import { Inject, Injectable } from "@nestjs/common";
import { ISMSService } from "./isms.service";
import { Message } from "../../domain/message";


@Injectable()
export class SmsService {
    constructor(
        @Inject('NAVER_SMS_SERVICE')
        private readonly externalSmsService: ISMSService
    ) {}

    async send(smsMessage: Message) {
        await this.externalSmsService.send(smsMessage);
    };
}