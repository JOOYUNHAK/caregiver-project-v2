import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthenticationCodeMessage } from "src/auth/domain/authentication-code-message";
import { ValidateSmsCodeDto } from "src/auth/interface/dto/validate-code.dto";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { SmsService } from "src/notification/sms/infra/service/sms.service";
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity";
import { PhoneRepository } from "src/user-auth-common/domain/repository/user-phone.repository";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Phone)
        private readonly phoneRepository: PhoneRepository,
        private readonly smsService: SmsService
    ) {}

    async register(phoneNumber: string) {
        await this.checkExistingUserByPhone(phoneNumber); // 가입되어있는 유저인지
        await this.smsService.send(new AuthenticationCodeMessage(phoneNumber)); // 인증코드 발송
    };

    async validateSmsCode(validateSmsCodeDto: ValidateSmsCodeDto): Promise<void> {
        /* 전화번호에 해당하는 인증코드 */
        const existAuthenticationCode = await this.smsService.getAuthenticationCode(validateSmsCodeDto.phoneNumber);
        /* 비교 */
        if( !existAuthenticationCode.isEqual(validateSmsCodeDto.code) )
            throw new UnauthorizedException(ErrorMessage.NotMatchedAuthenticationCode);
    }

    private async checkExistingUserByPhone(phoneNumber: string): Promise<void> {
        if( await this.phoneRepository.findByPhoneNumber(phoneNumber) )
            throw new ConflictException(ErrorMessage.DuplicatedPhoneNumber);
    }
}