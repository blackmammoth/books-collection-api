import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB, closeDB } from "./db";
import { ObjectId } from "mongodb";

dotenv.config();

const getBooks = async () => {
    const collection = await returnCollection();
    if (collection) {
        const books = await collection.find().toArray();
        console.log("Books: " , books);
        return books
    }
};

type BookSchema = {
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
}



const addBook = async (newBook: BookSchema) => {
    const collection = await returnCollection();
    if (collection) {
        const addedBook = await collection.insertOne(newBook);
        return addedBook;
    }

};

const updateBook = async (id: ObjectId, updatedBook: BookSchema) => {
    const collection = await returnCollection();
    console.log("ID IN: ", id)
    console.log("Updated Book: ", updatedBook)
    if (collection) {
        const submittedBook = await collection.findOneAndReplace({_id: id}, updatedBook);
        console.log(submittedBook)
        return submittedBook;
    }
};

const deleteBook = async (id: ObjectId) => {
    const collection = await returnCollection();
    if (collection) {
        const deletedBook = await collection.deleteOne({_id: id});
        return deletedBook;
    }
};

const getRandomBook = async () => {
    const collection = await returnCollection();
    if (collection) {
        const randomBook = await collection.aggregate([{ $sample: { size: 1 }}]).toArray();
        return randomBook[0];
    }
};


const returnCollection = async () => {
  try {
    const db = await connectDB();
    console.log("Connected to MongoDB");
    return db.collection("books-list");
  } catch (err) {
    console.error("Error:", err);
  }
};

const app: Express = express();
const port = process.env.PORT;

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Get Books - fetch all books from the database
app.get("/books", async (req: Request, res: Response) => {
  res.send(await getBooks());

  try {
    const books = await getBooks();
    res.status(200).send(books)
  } catch(err) {
    res.status(500).send({ message: "Error Fetching Books", error: err })
  }

});

// Post books - add new books to the database
app.post("/books", async (req: Request, res: Response) => {
    const book = req.body as BookSchema; // Access data from request body
    res.send(await addBook(book));
});

// PUT /books/:id - update a book in the database by id
app.put("/books/:id", async (req: Request, res: Response) => {
    const id = new ObjectId(req.params.id);
    console.log("Id: ", id)
    const book = {
        "title": req.body.title,
        "author": req.body.author, 
        "isbn": req.body.isbn,
        "publishedYear": req.body.publishedYear
    } as BookSchema;

    res.send(await updateBook(id, book))
});
// Delete /books/:id
app.delete("/books/:id", async (req: Request, res: Response) => {
    const id = new ObjectId(req.params.id);
    res.send(await deleteBook(id))
});

// /books/recommendations - selects a random book from the collection.
app.get("/books/recommendations", async (req: Request, res: Response) => {
  res.send(await getRandomBook());
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
