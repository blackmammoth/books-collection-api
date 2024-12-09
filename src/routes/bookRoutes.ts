import { Router } from "express";
import {
  getBooksController,
  addBookController,
  updateBookController,
  deleteBookController,
  getRandomBookController,
} from "../controllers/bookControllers";
import {
  authenticateToken,
  authorizeRoles,
} from "../middleware/authMiddleware";

const router = Router();

router.get(
  "/books/all",
  authenticateToken,
  authorizeRoles("admin"),
  getBooksController
);
router.post(
  "/books",
  authenticateToken,
  authorizeRoles("admin", "user"),
  addBookController
);
router.put(
  "/books/:id",
  authenticateToken,
  authorizeRoles("admin"),
  updateBookController
);
router.delete(
  "/books/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deleteBookController
);
router.get(
  "/books/recommendations",
  authenticateToken,
  authorizeRoles("admin", "users"),
  getRandomBookController
);

export default router;
