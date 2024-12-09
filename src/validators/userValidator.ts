import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "User name is required."),
  password: z.string().min(4, "Password must have length of more than 4.").max(60, "Password must have length of less than 60."),
});