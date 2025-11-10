import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is niet gedefinieerd in .env");
}

// Gebruik globale cache (belangrijk voor Next.js hot reload)
let isConnected = false;

export async function connectDB() {
    if (isConnected) {
        // Skip reconnecting if already connected
        return;
    }

    // Use mongoose.connection.readyState for extra safety
    if (mongoose.connection.readyState >= 1) {
        isConnected = true;
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: process.env.MONGODB_DB || "code_snippet_vault",
        });
        isConnected = true;
        console.log(
            "🔍 MONGODB_URI:",
            process.env.MONGODB_URI ? "found" : "not found"
        );

        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
}
