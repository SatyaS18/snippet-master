import mongoose, { model, Schema } from "mongoose";
import IShare from "../interfaces/models/share";

export const shareSchema: Schema = new Schema<IShare>(
  {
    id: {
      required: true,
      type: String,
    },
    snippetId: {
      required: true,
      type: String,
    },
    ownerId: {
      type: String,
      required: true,
    },
    validTill: {
      type: String,
      required: true,
    },
    viewedBy: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

shareSchema.set("toObject", { getters: true, virtuals: true });
shareSchema.set("toJSON", {
  virtuals: true,
  getters: true,
});

const ShareModel = mongoose.models.Share || model<IShare>("Share", shareSchema);

export default ShareModel;
