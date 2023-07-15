"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/create-user", user_controller_1.UserController.createUser);
router.post("/get-user", user_controller_1.UserController.getUsers);
router.patch("/update-user", user_controller_1.UserController.updateUser);
exports.UserRoutes = router;
