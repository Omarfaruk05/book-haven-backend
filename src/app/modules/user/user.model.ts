import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    wishList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser, UserModel>("User", userSchema);
