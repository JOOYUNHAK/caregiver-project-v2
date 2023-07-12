import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RedisClientType } from "redis";
import { AuthenticationCode } from "src/auth/domain/authentication-code";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";

@Injectable()
export class AuthenticationCodeService {
    constructor(
        @Inject('REDIS_CLIENT')
        private readonly redis: RedisClientType,
    ) {};

    /* 발송된 휴대폰번호 인증코드 추가 */
    async addPhoneCode(phoneNumber: string, code: string) {
        await this.redis.SETEX(`phone:${phoneNumber}:code`, 300, code);
    }

    /* 해당하는 휴대폰의 인증코드 조회 */
    async getPhoneCode(phoneNumber: string): Promise<AuthenticationCode> {
        const existCode =  await this.redis.GET(`phone:${phoneNumber}:code`);
        if( !existCode )
            throw new NotFoundException(ErrorMessage.ExpiredSmsCode);
        return new AuthenticationCode(parseInt(existCode));
    }
}