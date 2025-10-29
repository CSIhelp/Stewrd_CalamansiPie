import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Import Firebase 
import "./firebase.js"; 

// Routes
import userRouter from "./routes/auth.js";
import bookmarkRouter from "./routes/BookmarkRoutes.js";
import contactRouter from "./routes/contact.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.text({ type: "*/*" }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://customize.stewrd-calamansipie.pages.dev", "https://stewrd-calamansipie.pages.dev", "https://calamansistewrd.crowdsourcesolutions.ph" ], 
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
    credentials: true,
  })
);

console.log(" Backend server starting...");

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API is running " });
});

// Request logger
app.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Mount routes
app.use("/api/auth", userRouter);
app.use("/api/bookmarks", bookmarkRouter);
app.use("/api/contact", contactRouter);

// Start server
app.listen(PORT, () => {
  console.log(` Backend server running on http://localhost:${PORT}`);
});
