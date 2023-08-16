import { RedisClientType } from "redis";
import { IRankRepository } from "../domain/irank.repository";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ProfileViewRankRepository implements IRankRepository {
    private rankKey: string;

    constructor(
        @Inject('REDIS_CLIENT')
        private readonly redis: RedisClientType,
        private readonly configService: ConfigService
    ) {
        this.rankKey = configService.get('db.redis.key.profile_view_rank_key');
    };

    async increment(profileId: string): Promise<void> {
        await this.redis.ZINCRBY(this.rankKey, 1, profileId);
    }
}