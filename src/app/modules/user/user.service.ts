import httpStatus from "http-status";
import { User } from "./user.model";
import ApiError from "../../../errors/ApiError";
import { IUpdateResponse, IUser } from "./user.interface";
import { Types, UpdateWriteOpResult } from "mongoose";

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
  const result = await User.find({ email: email })
    .populate("wishList")
    .populate("reading")
    .populate("finished");
  console.log(result);

  return result;
};

const updateUserService = async (
  email: string,
  updatedData: Partial<IUser>
): Promise<any> => {
  const isExist = await User.findOne({ email: email });

  if (!isExist || !email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You are not othenticated.");
  }

  //for wish list

  if (updatedData.wishList) {
    const wishList = updatedData.wishList;

    const result = await User.updateOne(
      { email: email },
      {
        $addToSet: { wishList: { $each: wishList } },
        $pull: { reading: { $in: [wishList] }, finished: { $in: [wishList] } },
      },
      {
        new: true,
      }
    );

    return result;
  }

  // for reading
  if (updatedData.reading) {
    const reading = updatedData.reading;

    const result = await User.updateOne(
      { email: email },
      {
        $addToSet: { reading: { $each: reading } },
        $pullAll: { wishList: reading, finished: reading },
      },
      {
        new: true,
      }
    );

    return result;
  }

  //for finished
  if (updatedData.finished) {
    const finished = updatedData.finished;

    const result = await User.updateOne(
      { email: email },
      {
        $addToSet: { finished: { $each: finished } },
        $pullAll: { reading: finished, wishList: finished },
      },
      {
        new: true,
      }
    );

    return result;
  }
};

export const UserService = {
  createUserService,
  getUsersService,
  updateUserService,
};
