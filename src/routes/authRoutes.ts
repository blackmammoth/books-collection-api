import { Router } from "express";
import { addUserController, getUserController } from "../controllers/authControllers";

const router = Router();

// Controllers for signing up and logging in needed
router.post("/signup", addUserController);
router.post("/login", getUserController);

export default router;