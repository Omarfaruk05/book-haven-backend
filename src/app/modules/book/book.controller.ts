import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsycn";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookService } from "./book.service";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constant";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body;

  const result = await BookService.createBookService(bookData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);

  const result = await BookService.getAllBooksService(filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book fetched successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
};
