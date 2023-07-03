import { Db, MongoClient } from "mongodb";

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