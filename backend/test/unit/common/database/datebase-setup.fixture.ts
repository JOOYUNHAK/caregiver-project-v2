import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Db, MongoClient } from "mongodb";
import { RedisClientType, createClient } from "redis";
import { Token } from "src/user-auth-common/domain/entity/auth-token.entity";
import { Email } from "src/user-auth-common/domain/entity/user-email.entity";
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity";
import { UserProfile } from "src/user-auth-common/domain/entity/user-profile.entity";
import { User } from "src/user-auth-common/domain/entity/user.entity";

let mongodb: Db, mongoClient: MongoClient; // MongoDB

export async function ConnectMongoDB() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'test';

    mongoClient = new MongoClient(url);
    await mongoClient.connect();
    mongodb = mongoClient.db(dbName);
}

export function getMongodb() { return mongodb; };

export async function DisconnectMongoDB() { await mongoClient.close(); };

let redisClient: RedisClientType;

export async function ConnectRedis() {
    redisClient = createClient();
    await redisClient.connect();
};

export function getRedis() { return redisClient; };

export async function DisconnectRedis() { await redisClient.disconnect(); };

export const TestTypeOrmOptions: TypeOrmModuleOptions = {
    type: 'mysql',
    username: 'root',
    host: '127.0.0.1',
    port: 3306,
    password: '1234',
    database: 'test_caregiver_project',
    entities: [User, Phone, Email, UserProfile, Token],
    synchronize: true,
    logging: true
}