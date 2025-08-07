import { connect, disconnect } from "mongoose";

export async function connectDB() {
    const mongoUrl = process.env.MONGODB_URL;
    
    if (!mongoUrl) {
        throw new Error("MONGODB_URL is not defined in environment variables");
    }
 
    try {
        await connect(mongoUrl);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw new Error("Cannot connect to DB");
    }
}
