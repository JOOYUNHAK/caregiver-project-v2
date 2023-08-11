import { SmsService } from "src/notification/sms/application/service/sms.service";

/* Sms 서비스(SmsService) */
export const MockSmsService = {
    provide: SmsService,
    useValue: {
        send: jest.fn(),
    }
};