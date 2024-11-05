import ITag from "@/interfaces/models/tag";
import Tag from "@/models/Tag.model";
import { DeleteResult } from "mongodb";
import { HydratedDocument, UpdateWriteOpResult } from "mongoose";

type TagDocument = ITag & Document;

export const createTag = (tag: ITag): Promise<HydratedDocument<ITag>> => {
  return Tag.create(tag);
};

export const updateTag = (
  id: string,
  tag: ITag
): Promise<UpdateWriteOpResult> => {
  return Tag.updateOne({ id: id }, tag);
};

export const deleteTag = (id: string): Promise<DeleteResult> => {
  return Tag.deleteOne({ id });
};

export const findTag = (id: string): Promise<TagDocument | null> => {
  return Tag.findOne({ id });
};

export const findAllUserTag = (
  clerkUserId: string
): Promise<Array<HydratedDocument<ITag>>> => {
  return Tag.find({ clerkUserId });
};
