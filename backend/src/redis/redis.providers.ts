import { createClient } from "redis"

export const redisProviders = [
    {
        provide: 'REDIS_CLIENT',
        useFactory: async() => {
            const client = createClient();
            await client.connect();
            return client;
        }
    }
];