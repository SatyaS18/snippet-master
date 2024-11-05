import mongoose, { model, Schema } from "mongoose";
import ISnippet from "../interfaces/models/snippet";
import { tagSchema } from "./Tag.model";

export const snippetSchema: Schema = new Schema<ISnippet>(
  {
    id: {
      required: true,
      type: String,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
    title: {
      required: true,
      type: String,
    },
    isFavorite: {
      required: false,
      default: false,
      type: Boolean,
    },
    tags: [
      {
        required: false,
        default: [],
        type: tagSchema,
      },
    ],
    description: {
      required: false,
      type: String,
    },
    code: {
      required: false,
      type: String,
    },
    language: {
      required: false,
      type: String,
    },
    isDeleted: {
      required: false,
      default: false,
      type: Boolean,
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

snippetSchema.set("toObject", { getters: true, virtuals: true });
snippetSchema.set("toJSON", {
  virtuals: true,
  getters: true,
});

const SnippetModel =
  mongoose.models.Snippet || model<ISnippet>("Snippet", snippetSchema);

export default SnippetModel;
