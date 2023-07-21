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

    /* 세션리스트에 사용자 추가 */
    async addUserToList(userId: number, authentication: string) {
        await this.redis.HSET(this.key, userId, authentication);
    };

    /* 현재 세션리스트로부터 사용자 조회 */
    async getUserFromList(userId: number) {
        return await this.redis.HGET(this.key, userId.toString());
    }

    /* 세션리스트로부터 사용자 삭제 */
    async deleteUserFromList(userId: number) {
        await this.redis.HDEL(this.key, userId.toString());
    }
}