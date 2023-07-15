"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const validateRepuest_1 = __importDefault(require("../../middlewares/validateRepuest"));
const router = express_1.default.Router();
router.post("/create-book", (0, validateRepuest_1.default)(book_validation_1.BookValidation.createBookZodSchema), book_controller_1.BookController.createBook);
router.get("/get-book", book_controller_1.BookController.getAllBooks);
router.get("/get-single-book/:id", book_controller_1.BookController.getSingleBook);
router.patch("/update-book", book_controller_1.BookController.updateBook);
router.delete("/delete-book", book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
