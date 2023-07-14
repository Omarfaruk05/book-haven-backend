import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsycn";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const result = await UserService.createUserService(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(req.body);

  const result = await UserService.getUsersService(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { email, ...updatedData } = req.body;

  const result = await UserService.updateUserService(email, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getUsers,
  updateUser,
};
