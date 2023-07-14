import { Model, Types } from "mongoose";
import { IBook } from "../book/book.interface";
import { boolean } from "zod";

export type IUser = {
  _id?: string;
  fullName: string;
  email: string;
  password: string;
  wishList: [Types.ObjectId | IBook];
  reading: [Types.ObjectId | IBook];
  finished: [Types.ObjectId | IBook];
};
export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUpdateResponse = {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: boolean;
  upsertedCount: number;
  matchedCount: number;
};
