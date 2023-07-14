import httpStatus from "http-status";
import { User } from "./user.model";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import { Types } from "mongoose";

const createUserService = async (userData: IUser): Promise<IUser> => {
  const isExist = await User.findOne({ email: userData.email });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email must be unique.");
  }

  const result = await User.create(userData);

  return result;
};
const getUsersService = async (email: string): Promise<IUser[]> => {
  console.log(email);
  const result = await User.find({ email: email }).populate("wishList");
  console.log(result);

  return result;
};

const updateUserService = async (
  email: string,
  updatedData: Partial<IUser>
): Promise<void> => {
  const isExist = await User.findOne({ email: email });

  if (!isExist || !email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You are not othenticated.");
  }
  const wishlist = updatedData?.wishList;

  const result = await User.updateOne(
    { email: email },
    { $addToSet: { wishList: { $each: wishlist } } },
    {
      new: true,
    }
  );

  console.log(result);
};

export const UserService = {
  createUserService,
  getUsersService,
  updateUserService,
};
