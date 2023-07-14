import { Model, Types } from "mongoose";
import { IBook } from "../book/book.interface";

export type IUser = {
  _id?: string;
  fullName: string;
  email: string;
  password: string;
  wishList: [Types.ObjectId | IBook];
};
export type UserModel = Model<IUser, Record<string, unknown>>;
