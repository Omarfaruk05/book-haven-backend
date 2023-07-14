import { z } from "zod";

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required.",
    }),
    author: z.string({
      required_error: "Author is required.",
    }),
    authorEmail: z.string({
      required_error: "Author email is required.",
    }),
    genre: z.string({
      required_error: "Genre is required.",
    }),
    reviews: z.array(z.string()).optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
};
