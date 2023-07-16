"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const book_model_1 = require("./book.model");
const book_constant_1 = require("./book.constant");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const createBookService = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findOne({
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This book is already created");
    }
    const result = yield book_model_1.Book.create(bookData);
    return result;
});
const getAllBooksService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, publicationTime } = filters, filtersData = __rest(filters, ["searchTerm", "publicationTime"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    const end = "" + (Number(publicationTime) + 1);
    const startYear = new Date(publicationTime);
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
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    console.log(limit);
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.Book.find(whereConditions)
        .sort({ createdAt: -1 })
        .limit(limit);
    return result;
});
const getSingleBookService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id);
    return result;
});
const updateBookService = (email, id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findOne({ _id: id, authorEmail: email });
    if (!isExist || !email) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You cant't update the book.");
    }
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
    });
    return result;
});
const deleteBookService = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    const isothenticated = yield book_model_1.Book.find({ _id: id, authorEmail: email });
    if (!isothenticated || !email) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, " You can't delete this book.");
    }
    const result = yield book_model_1.Book.findByIdAndDelete(id);
    return result;
});
exports.BookService = {
    createBookService,
    getAllBooksService,
    getSingleBookService,
    updateBookService,
    deleteBookService,
};
