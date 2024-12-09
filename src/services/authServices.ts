import { UserSchema } from "../types";
import { returnCollection } from "./db";

export const addUser = async (newUser: UserSchema) => {
  const collection = await returnCollection("users");
  if (!collection) throw new Error("Collection not found");

  const result = await collection.insertOne(newUser);
  return result;
};

export const getUser = async (username: string) => {
  const collection = await returnCollection("users");
  if (!collection) throw new Error("Collection not found");

  const result = await collection
    .findOne({
      name: username,
    })

  if (!result) throw new Error("User not found");
  return result;
};
