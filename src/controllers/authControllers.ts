import { Request, Response } from "express";
import { createUserSchema } from "../validators/userValidator";
import bcrypt from "bcrypt";
import { addUser, getUser } from "../services/authServices";
import { UserSchema } from "../types";

const SALT_ROUNDS = 10;

export const addUserController = async (req: Request, res: Response) => {
  try {
    const user = createUserSchema.parse(req.body);
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);

    const newUser = {
      ...user,
      password: hash,
    } as UserSchema;

    const addedUser = await addUser(newUser);
    res.status(201).json(addedUser);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const user = createUserSchema.parse(req.body);
    const userDb = await getUser(user.name);

    const passwordIsValid = await bcrypt.compare(user.password, userDb.password);
    if (!passwordIsValid) throw new Error("Invalid password");

    res.status(200).json(userDb);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
