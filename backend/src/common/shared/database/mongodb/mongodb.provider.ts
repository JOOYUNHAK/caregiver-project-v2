import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongoClient } from "mongodb";

export const mongodbProvider = [
    {
        provide: 'MONGO_CONNECTION',
        import: [ConfigModule],
        inject: [ConfigService],
        useFactory: async(configService: ConfigService) => {
            try{
                const client = await MongoClient.connect(configService.get('db.mongodb.uri'));
                return client.db(configService.get('db.mongodb.database'));
            }
            catch(err) {
                throw err;
            }
        }
    }
]
