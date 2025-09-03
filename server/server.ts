import dotenv from 'dotenv';
dotenv.config(); 

import mongoose from "mongoose";
import router from "./routes/auth.js";
import cors from "cors";
import express from "express";


const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is required");
}

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

process.env.JWT_SECRET = JWT_SECRET;

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true,
}));

console.log("✅ Backend server starting...");

mongoose.connect(MONGO_URI, { dbName: "John_Users" })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.use("/api/auth", router);
    app.listen(PORT, () => {
      console.log(`✅ Backend server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });