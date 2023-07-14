import express from "express";
import { BookController } from "./book.controller";
import { BookValidation } from "./book.validation";
import validateRequest from "../../middlewares/validateRepuest";

const router = express.Router();

router.post(
  "/create-book",
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);
router.get("/get-book", BookController.getAllBooks);

export const BookRoutes = router;
