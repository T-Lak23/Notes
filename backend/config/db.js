import mongoose from "mongoose";
import { ENV } from "./env.js";
export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(ENV.MONGO_URI);
    console.log("connected", connection.connection.host);
  } catch (error) {
    console.log("Failed to connect db", error);
    process.exit(1);
  }
};
