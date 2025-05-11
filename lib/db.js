import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected!`);
    } catch (error) {
        console.log(`MongoDB connection error: `, error);
    }
};