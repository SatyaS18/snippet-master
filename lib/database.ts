import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error in connecting to DB - ", error);
  }
};
