import { Injectable } from "@nestjs/common";
import { ISMSService } from "../../application/service/isms.service";
import { NaverSmsService } from "./naver-sms.service";
import { Message } from "../../domain/message";


@Injectable()
export class SmsService implements ISMSService {
    constructor(
        private readonly naverSmsService: NaverSmsService
    ) {}

    async send(smsMessage: Message) {
        await this.naverSmsService.send(smsMessage);
    };
}