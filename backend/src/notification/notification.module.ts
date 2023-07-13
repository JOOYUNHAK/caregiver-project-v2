import { Module } from "@nestjs/common";
import { SmsService } from "./sms/infra/service/sms.service";
import { NaverSmsService } from "./sms/infra/service/naver-sms.service";

@Module({
    providers: [
        SmsService,
        NaverSmsService
    ],
    exports: [
        SmsService,
        NaverSmsService
    ]
})
export class NotificationModule {};