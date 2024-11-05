import mongoose, { model, Schema } from "mongoose";
import IUser from "../interfaces/models/user";

const userSchema: Schema = new Schema<IUser>(
  {
    userId: {
      required: true,
      type: String,
    },
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      required: true,
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.set("toObject", { getters: true, virtuals: true });
userSchema.set("toJSON", {
  virtuals: true,
  getters: true,
});

const User = mongoose.models.User || model<IUser>("User", userSchema);

export default User;
