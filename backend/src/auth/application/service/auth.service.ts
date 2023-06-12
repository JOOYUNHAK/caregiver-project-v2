import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthenticationCodeMessage } from "src/auth/domain/authentication-code-message";
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
        Phone.validate(phoneNumber); // 휴대폰 형식 체크
        await this.checkExistingUserByPhone(phoneNumber); // 가입되어있는 유저인지
        await this.smsService.send(new AuthenticationCodeMessage(phoneNumber)); // 인증코드 발송
    }

    private async checkExistingUserByPhone(phoneNumber: string): Promise<void> {
        if( await this.phoneRepository.findByPhoneNumber(phoneNumber) )
            throw new ConflictException(ErrorMessage.DuplicatedPhoneNumber);
    }
}