import { Router } from "express";
import { getBooksController, addBookController, updateBookController, deleteBookController, getRandomBookController } from "../controllers/bookControllers";

const router = Router();

router.get("/books", getBooksController);
router.post("/books", addBookController);
router.put("/books/:id", updateBookController);
router.delete("/books/:id", deleteBookController);
router.get("/books/recommendations", getRandomBookController);

export default router;