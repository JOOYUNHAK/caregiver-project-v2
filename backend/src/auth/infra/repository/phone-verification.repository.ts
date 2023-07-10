import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { RedisClientType } from "redis";
import { PhoneVerificationUsage } from "src/auth/domain/entity/phone-verification-usage.entity";
import { IPhoneVerificationRepository } from "src/auth/domain/repository/iphone-verification.repository";

@Injectable()
export class PhoneVerificationRepository implements IPhoneVerificationRepository {
    private key: string // redis hash key
    constructor(
        @Inject('REDIS_CLIENT')
        private readonly redis: RedisClientType,
        private readonly configService: ConfigService
    ) {
        this.key = configService.get('redis.key.phone_verification_usage');
    }

    async save(phoneNumber: string, phoneVerificationUsage: PhoneVerificationUsage): Promise<void> {
        await this.redis.HSET(this.key, phoneNumber, phoneVerificationUsage.toSerializedString());
    };
    
    async findByPhoneNumber(phoneNumber: string): Promise<PhoneVerificationUsage | null> {
        return this.parseToInstance( await this.redis.HGET(this.key, phoneNumber) );
    };

    async delete(phoneNumber: string): Promise<void> {
        await this.redis.HDEL(this.key, phoneNumber);
    }

    /* 문자열로 저장된 객체 파싱 후 인스턴스로 */
    private parseToInstance(serializedString: string): PhoneVerificationUsage {
        return plainToInstance(
            PhoneVerificationUsage,
            JSON.parse(serializedString)
        )
    }
}