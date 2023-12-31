import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { Db, MongoClient } from "mongodb";
import { RedisClientType, createClient } from "redis";
import { ChatMessage } from "src/chat/domain/entity/chat-message.entity";
import { ChatRoom } from "src/chat/domain/entity/chat-room.entity";
import { Participant } from "src/chat/domain/entity/participant.entity";
import { ProfileLike } from "src/profile/domain/entity/profile-like";
import { ProfileViewRecord } from "src/rank/domain/entity/profile-view-record.entity";
import { Token } from "src/user-auth-common/domain/entity/auth-token.entity";
import { Email } from "src/user-auth-common/domain/entity/user-email.entity";
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity";
import { UserProfile } from "src/user-auth-common/domain/entity/user-profile.entity";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

/* MongoDB Test Connection Set Up */
let mongodb: Db, mongoClient: MongoClient;

export async function ConnectMongoDB() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'test';

    mongoClient = new MongoClient(url);
    await mongoClient.connect();
    mongodb = mongoClient.db(dbName);
}

export function getMongodb() { return mongodb; };

export async function DisconnectMongoDB() { await mongoClient.close(); };

/* Redis Test Connection Set Up */
let redisClient: RedisClientType;

export async function ConnectRedis() {
    redisClient = createClient();
    await redisClient.connect();
};

export function getRedis() { return redisClient; };

export async function DisconnectRedis() { await redisClient.disconnect(); };

/* MySQL Test Connection Set Up */
export class TestTypeOrm {
    
    public static async withEntities(...entities: EntityClassOrSchema []): Promise<DataSource> {
        return new DataSource(this.withTestOptions(entities)).initialize();
    }

    public static async disconnect(dataSource: DataSource):Promise<void> { await dataSource.destroy(); };

    private static withTestOptions(entities: EntityClassOrSchema []): DataSourceOptions {
        return ({
            type: 'mysql',
            username: 'root',
            host: '127.0.0.1',
            port: 3306,
            password: '1234',
            database: 'test_caregiver_project',
            entities: entities,
            synchronize: true,
            logging: true
        })
    }
};

export const TestTypeOrmOptions: TypeOrmModuleOptions = {
    type: 'mysql',
    username: 'root',
    host: '127.0.0.1',
    port: 3306,
    password: '1234',
    database: 'test_caregiver_project',
    entities: [
        User, Phone, Email, UserProfile, Token, ProfileViewRecord, ProfileLike,
        ChatRoom, ChatMessage, Participant
    ],
    synchronize: true,
    logging: true
}