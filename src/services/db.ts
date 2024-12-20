
import { MongoClient, Db } from 'mongodb';
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.DB_CONN_STRING || 'connection-string';

let client: MongoClient;
let db: Db;

export const connectDB = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(process.env.DB_NAME);
  }
  return db;
};

export const closeDB = async () => {
  if (client) await client.close();
};

export const returnCollection = async (collection_name: string = "books-list") => {
  try {
    const db = await connectDB();
    return db.collection(collection_name);
  } catch (err) {
    console.error("Error:", err);
  }
};