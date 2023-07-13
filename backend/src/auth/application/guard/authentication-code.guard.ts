import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { VerificationUsageService } from "../service/verification-usage.service";
import { UserRepository } from "src/user-auth-common/domain/repository/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { AuthenticationCodeService } from "../service/authentication-code.service";

@Injectable()
export class PhoneAuthenticationCodeGuard implements CanActivate {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
        private readonly verificationUsageService: VerificationUsageService,
        private readonly authenticationCodeService: AuthenticationCodeService
    ) {};

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { phoneNumber, code, isNewUser } = request.body;

        const existCode = await this.authenticationCodeService.getPhoneCode(phoneNumber); // 코드 유효시간 체크

        const phoneVerificationUsage = await this.verificationUsageService.getPhoneUsageHistory(phoneNumber);
        phoneVerificationUsage.codeAttempCheck(); // 인증번호 시도횟수 체크
        await this.verificationUsageService.addPhoneCodeAttemp(phoneNumber, phoneVerificationUsage); // 인증번호 시도횟수 추가
        
        existCode.verify(code, phoneVerificationUsage.remainChancePerCode()); // 인증번호 일치하는지 체크
        return await this.succededAuthentication(request, phoneNumber, isNewUser);
    };

    private async succededAuthentication(request: any, phoneNumber: string, isNewUser: boolean): Promise<boolean> {
        if( !isNewUser ) {
            const user = await this.userRepository.findByPhoneNumber(phoneNumber); // 기존 사용자
            request.user = user;
        }   
        return true;
    }
}