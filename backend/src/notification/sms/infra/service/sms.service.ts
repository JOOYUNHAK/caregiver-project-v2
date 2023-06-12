import { Injectable } from "@nestjs/common";
import { ISMSService } from "../../application/service/isms.service";
import { NaverSmsService } from "./naver-sms.service";
import { AuthenticationCodeMessage } from "src/auth/domain/authentication-code-message";


@Injectable()
export class SmsService implements ISMSService {
    constructor(
        private readonly naverSmsService: NaverSmsService
    ) {}

    async send(smsMessage: AuthenticationCodeMessage) {
        await this.naverSmsService.send(smsMessage);
    }
}