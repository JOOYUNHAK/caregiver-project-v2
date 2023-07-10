import { CanActivate, ExecutionContext } from "@nestjs/common";
import { PhoneVerificationUsage } from "src/auth/domain/entity/phone-verification-usage.entity";
import { PhoneVerificationRepository } from "src/auth/infra/repository/phone-verification.repository";

/* 휴대폰 인증 일일 발송 횟수 제한 */
export class PhoneAuthenticationSendGuard implements CanActivate {
    constructor(
        private readonly phoneVerificationRepository: PhoneVerificationRepository
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { phoneNumber } = request.body;

        let phoneVerificationUsage = await this.getUsageByPhoneNumber(phoneNumber);

        if( phoneVerificationUsage )
            phoneVerificationUsage.dayAttempCheck(); // 일일 인증 횟수 체크
        else phoneVerificationUsage = new PhoneVerificationUsage();

        // request 객체에 인증횟수 정보 담아서 보냄 
        // 발송하고 난 이후 객체의 값을 변경해야되기 때문
        request.authenticationUsage = phoneVerificationUsage; 
        return true;
    }

    /* 해당 휴대폰의 인증 사용내역 */
    private async getUsageByPhoneNumber(phoneNumber: string): Promise<PhoneVerificationUsage> {
        return await this.phoneVerificationRepository.findByPhoneNumber(phoneNumber);
    }
}