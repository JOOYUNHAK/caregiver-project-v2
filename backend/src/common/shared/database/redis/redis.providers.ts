import { ConfigService } from "@nestjs/config";
import { createClient } from "redis"

export const redisProviders = [
    {
        inject: [ConfigService],
        provide: 'REDIS_CLIENT',
        useFactory: async(configService: ConfigService) => {
            const client = createClient({
                username: configService.get('db.redis.acl.username'),
                password: configService.get('db.redis.acl.password'),
                socket: {
                    port: configService.get('db.redis.acl.port'),
                    host: configService.get('db.redis.acl.host')
                }
            })
            await client.connect();
            return client;
        }
    }
];