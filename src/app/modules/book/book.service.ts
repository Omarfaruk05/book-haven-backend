import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBook } from "./book.interface";
import { Book } from "./book.model";

const createBookService = async (bookData: IBook): Promise<IBook> => {
  const isExist = await Book.findOne({
    title: bookData.title,
    author: bookData.author,
    genre: bookData.genre,
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This book is already created");
  }
  const result = await Book.create(bookData);

  return result;
};

export const BookService = {
  createBookService,
};
