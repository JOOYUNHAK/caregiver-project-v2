import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ISMSService } from "../../application/service/isms.service";
import { NaverSmsService } from "./naver-sms.service";
import { AuthenticationCodeMessage } from "src/auth/domain/authentication-code-message";
import { RedisClientType } from "redis";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { AuthenticationCode } from "src/auth/domain/authentication-code";


@Injectable()
export class SmsService implements ISMSService {
    constructor(
        @Inject('REDIS_CLIENT')
        private readonly redis: RedisClientType,
        private readonly naverSmsService: NaverSmsService
    ) {}

    async send(smsMessage: AuthenticationCodeMessage) {
        await this.naverSmsService.send(smsMessage);
    };

    /* 사용자의 휴대폰 인증 코드 */
    async getAuthenticationCode(phoneNumber: string): Promise<AuthenticationCode> {
        const authenticationCode = await this.redis.GET(`phone:${phoneNumber}:code`);
        if( !authenticationCode )
            throw new UnauthorizedException(ErrorMessage.ExpiredSmsCode);
        return new AuthenticationCode(parseInt(authenticationCode));
    }   
}