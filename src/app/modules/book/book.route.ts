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

export const BookRoutes = router;
