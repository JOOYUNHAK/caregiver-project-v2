import { PhoneVerificationUsage } from "../entity/phone-verification-usage.entity";

export interface IPhoneVerificationRepository {
    save(phoneNumber: string, phoneVerificationUsage: PhoneVerificationUsage): Promise<void>;
    findByPhoneNumber(phoneNumber: string): Promise<PhoneVerificationUsage | null>;
    delete(phoneNumber: string): Promise<void>;
}