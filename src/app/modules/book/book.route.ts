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

router.get("/get-single-book/:id", BookController.getSingleBook);

router.patch("/update-book", BookController.updateBook);
router.delete("/delete-book", BookController.deleteBook);

export const BookRoutes = router;
