import ISnippet from "@/interfaces/models/snippet";
import Snippet from "@/models/Snippet.model";
import { DeleteResult } from "mongodb";
import { HydratedDocument, UpdateWriteOpResult } from "mongoose";

type SnippetDocument = ISnippet & Document;

export const createSnippet = (
  snippet: ISnippet
): Promise<HydratedDocument<ISnippet>> => {
  return Snippet.create(snippet);
};

export const updateSnippet = (
  id: string,
  snippet: ISnippet
): Promise<UpdateWriteOpResult> => {
  return Snippet.updateOne({ id: id }, snippet);
};

export const deleteSnippet = (id: string): Promise<DeleteResult> => {
  return Snippet.deleteOne({ id });
};

export const findSnippet = (id: string): Promise<SnippetDocument | null> => {
  return Snippet.findOne({ id });
};

export const findAllUserSnippet = (
  clerkUserId: string
): Promise<Array<HydratedDocument<ISnippet>>> => {
  return Snippet.find({ clerkUserId });
};
