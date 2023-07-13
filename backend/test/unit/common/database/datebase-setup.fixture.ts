import { Db, MongoClient } from "mongodb";
import { RedisClientType, createClient } from "redis";

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