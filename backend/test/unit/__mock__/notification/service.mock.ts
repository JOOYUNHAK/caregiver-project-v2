import { SmsService } from "src/notification/sms/infra/service/sms.service";

/* Sms 서비스(SmsService) */
export const MockSmsService = {
    provide: SmsService,
    useValue: {
        send: jest.fn(),
        getAuthenticationCode: jest.fn()
    }
};