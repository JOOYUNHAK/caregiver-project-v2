import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthenticationCodeMessage } from "src/auth/domain/authentication-code-message";
import { ValidateSmsCodeDto } from "src/auth/interface/dto/validate-code.dto";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { SmsService } from "src/notification/sms/infra/service/sms.service";
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity";
import { PhoneRepository } from "src/user-auth-common/domain/repository/user-phone.repository";
import { VerificationUsageService } from "./verification-usage.service";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Phone)
        private readonly phoneRepository: PhoneRepository,
        private readonly verificationUsageService: VerificationUsageService,
        private readonly smsService: SmsService
    ) {}

    async register(phoneNumber: string) {
        /* 이미 가입된 전화번호 인지 확인 이후 인증번호 발송 */
        if( await this.checkExistingUserByPhone(phoneNumber) )
            throw new ConflictException(ErrorMessage.DuplicatedPhoneNumber);
        await this.smsService.send(new AuthenticationCodeMessage(phoneNumber));
    };

    /* 신규회원이면 인증에 성공하면 바로 회원가입창으로 이동 */
    async login(phoneNumber: string): Promise<'newuser' | 'exist'> {
        await this.smsService.send(new AuthenticationCodeMessage(phoneNumber)); // 인증번호 발송
        await this.verificationUsageService.addPhoneUsageHistory(phoneNumber); // 발송 내역 추가
        if( await this.checkExistingUserByPhone(phoneNumber) ) return 'exist'; // 가입 사용자인지 체크
        return 'newuser';
    }

    async validateSmsCode(validateSmsCodeDto: ValidateSmsCodeDto): Promise<void> {
        /* 전화번호에 해당하는 인증코드 */
        const existAuthenticationCode = await this.smsService.getAuthenticationCode(validateSmsCodeDto.phoneNumber);
        /* 비교 */
        if( !existAuthenticationCode.isEqual(validateSmsCodeDto.code) )
            throw new UnauthorizedException(ErrorMessage.NotMatchedAuthenticationCode);
    }

    /* 가입된 휴대폰인지 여부 */
    private async checkExistingUserByPhone(phoneNumber: string): Promise<boolean> {
        if( await this.phoneRepository.findByPhoneNumber(phoneNumber) )
            return true;
        return false;
    }
}