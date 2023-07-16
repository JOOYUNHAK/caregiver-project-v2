import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisClientType } from "redis";

@Injectable()
export class SessionService {
    private key: string;

    constructor(
        @Inject('REDIS_CLIENT')
        private readonly redis: RedisClientType,
        private readonly configService: ConfigService
    ) { this.key = configService.get('db.redis.key.session_list')};

    async addUserToList(userId: number, authentication: string) {
        await this.redis.HSET(this.key, userId, authentication);
    };

    async getUserFromList(userId: number) {
        return await this.redis.HGET(this.key, userId.toString());
    }
}