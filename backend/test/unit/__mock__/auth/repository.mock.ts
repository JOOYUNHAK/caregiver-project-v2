import { PhoneVerificationRepository } from "src/auth/infra/repository/phone-verification.repository";

export const MockPhoneVerificationRepository = {
    provide: PhoneVerificationRepository,
    useValue: {
        save: jest.fn(),
        findByPhoneNumber: jest.fn(),
        delete: jest.fn()
    }
}