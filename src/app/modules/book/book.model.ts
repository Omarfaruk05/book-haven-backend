import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorEmail: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationTime: {
      type: Date,
      required: true,
    },
    reviews: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBook, BookModel>("Book", bookSchema);
