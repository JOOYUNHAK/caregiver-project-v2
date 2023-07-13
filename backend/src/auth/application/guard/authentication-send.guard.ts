import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { VerificationUsageService } from "../service/verification-usage.service";

/* 휴대폰 인증 일일 발송 횟수 제한 */
@Injectable()
export class PhoneAuthenticationSendGuard implements CanActivate {
    constructor(
        private readonly verificationUsageService: VerificationUsageService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { phoneNumber } = context.switchToHttp().getRequest().body;
        const phoneVerificationUsage = await this.verificationUsageService.getPhoneUsageHistory(phoneNumber);

        if( phoneVerificationUsage )
            phoneVerificationUsage.dayAttempCheck(); // 일일 인증 횟수 체크

        return true;
    }
}