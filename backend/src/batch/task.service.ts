import { Inject, Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { RedisClientType } from "redis";
import { PhoneVerificationUsage } from "src/auth/domain/entity/phone-verification-usage.entity";
import { PhoneVerificationRepository } from "src/auth/infra/repository/phone-verification.repository";
import { DateTime } from "src/util/datetime.util";

@Injectable()
export class TaskService {
    private readonly PHONE_AUTH_KEY_EXPIRED_TIME = 86400;
    constructor(
        @Inject('REDIS_CLIENT')
        private readonly redis: RedisClientType,
        private readonly phoneVerificationUsageRepository: PhoneVerificationRepository
    ) {};

    /* 매일 자정 하루동안 유지되는 그날의 휴대폰 인증 사용량 Key 만료시간 설정 */
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async DailyPhoneAuthUsageExpiredTask() {
        const today = DateTime.getToday();

        /* Key가 없을 경우 임의의 값을 넣고 저장 후 만료시간 설정 */
        if( !await this.setDailyPhoneAuthUsageExpired(today) ) {
            await this.phoneVerificationUsageRepository.save('default', new PhoneVerificationUsage());
            await this.setDailyPhoneAuthUsageExpired(today);
        }
    };

    private async setDailyPhoneAuthUsageExpired(today: number): Promise<boolean> {
        return await this.redis.EXPIRE(`phone:auth:${today}:usage`, this.PHONE_AUTH_KEY_EXPIRED_TIME)
    }
}