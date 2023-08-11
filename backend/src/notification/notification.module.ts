import { Module } from "@nestjs/common";
import { SmsService } from "./sms/application/service/sms.service";
import { naverSmsProvider, NaverSmsService } from "./sms/infra/service/naver-sms.service";

@Module({
    providers: [
        SmsService,
        naverSmsProvider,
        NaverSmsService
    ],
    exports: [
        SmsService,
        naverSmsProvider,
        NaverSmsService
    ]
})
export class NotificationModule {};