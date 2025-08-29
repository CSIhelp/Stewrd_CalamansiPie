
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/auth";
import cors from "cors"
import express from "express";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI!, { dbName: "John_Users" })
  .then(() => {
    console.log(" Connected to MongoDB Atlas");

    //  only start server after DB is ready
    app.use("/api/auth", router);
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(" MongoDB connection error:", err);
  });
