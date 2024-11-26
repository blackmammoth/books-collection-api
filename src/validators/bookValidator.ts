import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "Title is required."),
  author: z.string().min(1, "Author is required."),
  isbn: z.string().min(1, "ISBN is required."),
  publishedYear: z
    .number()
    .min(1000, "Published year must be a valid year")
    .max(2024, "Published year must be a valid year."),
});