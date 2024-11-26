
import { MongoClient, Db } from 'mongodb';
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.DB_CONN_STRING || 'connection-string';

let client: MongoClient;
let db: Db;

console.log("Process env: ", process.env.DB_NAME)

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

export const returnCollection = async () => {
  try {
    const db = await connectDB();
    return db.collection("books-list");
  } catch (err) {
    console.error("Error:", err);
  }
};