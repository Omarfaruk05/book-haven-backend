import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";
import { bookSearchableFields } from "./book.constant";
import { IPaginationOptions } from "../../../interfaces/paginatin.interface";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";

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

const getAllBooksService = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IBook[]> => {
  const { searchTerm, publicationTime, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  const end = "" + (Number(publicationTime) + 1);

  const startYear = new Date(publicationTime as string);
  const endYear = new Date(end);

  if (publicationTime) {
    andConditions.push({
      publicationTime: {
        $gte: startYear,
        $lt: endYear,
      },
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: "i",
        },
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  console.log(limit);

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort({ createdAt: -1 })
    .limit(limit);

  return result;
};

const getSingleBookService = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);

  return result;
};

const updateBookService = async (
  email: string,
  id: string,
  updatedData: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id, authorEmail: email });

  if (!isExist || !email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You cant't update the book.");
  }
  const result = await Book.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  });

  return result;
};

const deleteBookService = async (
  id: string,
  email: string
): Promise<IBook | null> => {
  const isothenticated = await Book.find({ _id: id, authorEmail: email });

  if (!isothenticated || !email) {
    throw new ApiError(httpStatus.BAD_REQUEST, " You can't delete this book.");
  }

  const result = await Book.findByIdAndDelete(id);

  return result;
};

export const BookService = {
  createBookService,
  getAllBooksService,
  getSingleBookService,
  updateBookService,
  deleteBookService,
};
