import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getBooks, addBook, updateBook, deleteBook, getRandomBook } from "../services/bookServices";
import { createBookSchema } from "../validators/bookValidator";

export const getBooksController = async (req: Request, res: Response) => {
  try {
    const books = await getBooks();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books", error: err });
  }
};

export const addBookController = async (req: Request, res: Response) => {
  try {
    const validated = createBookSchema.parse(req.body);
    const newBook = await addBook(validated);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const updateBookController = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);
    const validated = createBookSchema.parse(req.body);
    const updatedBook = await updateBook(id, validated);
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const deleteBookController = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);
    const success = await deleteBook(id);
    if (success) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const getRandomBookController = async (req: Request, res: Response) => {
  try {
    const randomBook = await getRandomBook();
    res.status(200).json(randomBook);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch random book", error: err });
  }
};
