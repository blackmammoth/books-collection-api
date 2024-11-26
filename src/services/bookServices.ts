import { ObjectId } from "mongodb";
import { BookSchema } from "../types";
import { returnCollection } from "./db";

export const getBooks = async () => {
  const collection = await returnCollection();
  return collection ? collection.find().toArray() : [];
};

export const addBook = async (newBook: BookSchema) => {
  const collection = await returnCollection();
  if (!collection) throw new Error("Collection not found");

  const result = await collection.insertOne(newBook);
  return result;
};

export const updateBook = async (id: ObjectId, updatedBook: BookSchema) => {
  const collection = await returnCollection();
  if (!collection) throw new Error("Collection not found");

  const updated = await collection.findOneAndReplace({ _id: id }, updatedBook, { returnDocument: 'after' });
  if (!updated) throw new Error("Book not found");

  return updated;
};

export const deleteBook = async (id: ObjectId) => {
  const collection = await returnCollection();
  if (!collection) throw new Error("Collection not found");

  const result = await collection.deleteOne({ _id: id });
  return result.deletedCount > 0;
};

export const getRandomBook = async () => {
  const collection = await returnCollection();
  if (!collection) throw new Error("Collection not found");

  const randomBook = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
  return randomBook[0];
};
