import IUser from "@/interfaces/models/user";
import User from "@/models/User.model";
import { DeleteResult } from "mongodb";
import { HydratedDocument, UpdateWriteOpResult } from "mongoose";

type UserDocument = IUser & Document;

export const createUser = (user: IUser): Promise<HydratedDocument<IUser>> => {
  return User.create(user);
};

export const updateUser = (
  id: string,
  user: IUser
): Promise<UpdateWriteOpResult> => {
  return User.updateOne({ id: id }, user);
};

export const deleteUser = (id: string): Promise<DeleteResult> => {
  return User.deleteOne({ id });
};

export const findUser = (id: string): Promise<UserDocument | null> => {
  return User.findOne({ id });
};

export const findAllUserUser = (
  clerkUserId: string
): Promise<Array<HydratedDocument<IUser>>> => {
  return User.find({ clerkUserId });
};
