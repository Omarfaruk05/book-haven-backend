import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsycn";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookService } from "./book.service";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { bookData } = req.body;

  const result = await BookService.createBookService(bookData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
};
