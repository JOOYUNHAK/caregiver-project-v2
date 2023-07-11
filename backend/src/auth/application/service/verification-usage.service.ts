import { Injectable } from "@nestjs/common";
import { PhoneVerificationUsage } from "src/auth/domain/entity/phone-verification-usage.entity";
import { PhoneVerificationRepository } from "src/auth/infra/repository/phone-verification.repository";

@Injectable()
export class VerificationUsageService {
    constructor(
        private readonly phoneVerificationRepository: PhoneVerificationRepository
    ) {}

    /* 휴대폰인증 사용횟수 추가 */
    async addPhoneUsageHistory(phoneNumber: string) {
        let phoneUsageHistory = await this.getPhoneUsageHistory(phoneNumber);

        if( !phoneUsageHistory ) 
            phoneUsageHistory = new PhoneVerificationUsage();
        phoneUsageHistory.addHistory();
        
        await this.phoneVerificationRepository.save(phoneNumber, phoneUsageHistory);
    };

    /* 휴대폰인증 사용횟수 조회 */
    async getPhoneUsageHistory(phoneNumber: string): Promise<PhoneVerificationUsage> {
        return await this.phoneVerificationRepository.findByPhoneNumber(phoneNumber);
    };
}