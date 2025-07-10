import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected on host ${connect.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection failed`);
    process.exit(1);
  }
};
