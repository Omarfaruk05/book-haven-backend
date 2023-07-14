import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/create-user", UserController.createUser);
router.post("/get-user", UserController.getUsers);
router.patch("/update-user", UserController.updateUser);

export const UserRoutes = router;
