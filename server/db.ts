import dns from "node:dns";
import mongoose from "mongoose";

// Configure reliable DNS servers for MongoDB Atlas SRV records on local Windows networks
if (!process.env.VERCEL) {
  try {
    dns.setDefaultResultOrder("ipv4first");
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch {
    // Fallback to default if restricted
  }
}

let isConnected = false;

export async function connectDB(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("⚠️ Warning: MONGODB_URI is not set. Database operations will fail until configured.");
    return null;
  }

  if (isConnected || mongoose.connection.readyState === 1) {
    return mongoose;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected to database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    return null;
  }
}
