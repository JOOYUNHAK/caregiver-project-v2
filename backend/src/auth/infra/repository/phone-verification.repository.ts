import { Inject, Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { RedisClientType } from "redis";
import { PhoneVerificationUsage } from "src/auth/domain/entity/phone-verification-usage.entity";
import { IPhoneVerificationRepository } from "src/auth/domain/repository/iphone-verification.repository";
import { DateTime } from "src/util/datetime.util";

@Injectable()
export class PhoneVerificationRepository implements IPhoneVerificationRepository {
    constructor(
        @Inject('REDIS_CLIENT')
        private readonly redis: RedisClientType,
    ) {}

    async save(phoneNumber: string, phoneVerificationUsage: PhoneVerificationUsage): Promise<void> {
        await this.redis.HSET(`phone:auth:${DateTime.getToday()}:usage`, phoneNumber, phoneVerificationUsage.toSerializedString());
    };
    
    async findByPhoneNumber(phoneNumber: string): Promise<PhoneVerificationUsage | null> {
        return this.parseToInstance( await this.redis.HGET(`phone:auth:${DateTime.getToday()}:usage`, phoneNumber) );
    };

    async delete(phoneNumber: string): Promise<void> {
        await this.redis.HDEL(`phone:auth:${DateTime.getToday()}:usage`, phoneNumber);
    }

    /* 문자열로 저장된 객체 파싱 후 인스턴스로 */
    private parseToInstance(serializedString: string): PhoneVerificationUsage {
        return plainToInstance(
            PhoneVerificationUsage,
            JSON.parse(serializedString)
        )
    }
}