import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // console.log("[connectDB] MONGO_URL:", process.env.MONGO_URL);
    const conn = await mongoose.connect(process.env.MONGO_URL || "");

    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};
