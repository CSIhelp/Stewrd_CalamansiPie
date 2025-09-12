import express, { Request, Response } from "express";
import Bookmark from "../models/Bookmark.js";
import jwt from "jsonwebtoken";

const Bookmarkrouter = express.Router();
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error("JWT_SECRET environment variable not set!");

function getClientIdFromToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtSecret as string);
    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      return (decoded as jwt.JwtPayload).id as string; 
    }
    return null;
  } catch (err) {
    console.error("JWT verify error:", err);
    return null;
  }
}

// Add bookmark
Bookmarkrouter.post("/", async (req: Request, res: Response) => {
  try {
    const clientId = getClientIdFromToken(req);
    if (!clientId) return res.status(401).json({ error: "Unauthorized" });

    const { cardId, title, description, buttonText, buttonLink, category } = req.body;
    if (!cardId || !title) {
      return res.status(400).json({ error: "Missing cardId or title" });
    }

    const exists = await Bookmark.findOne({ user: clientId, cardId });
    if (exists) return res.status(400).json({ error: "Already bookmarked" });

    const bookmark = new Bookmark({
      user: clientId, 
      cardId,
      title,
      description,
      buttonText,
      buttonLink,
      category,
    });

    await bookmark.save();
    res.json({ success: true, bookmark });
  } catch (err) {
    console.error("Add bookmark error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Remove bookmark
Bookmarkrouter.delete("/bookmarks/:cardId", async (req: Request, res: Response) => {
  try {
    const clientId = getClientIdFromToken(req);
    if (!clientId) return res.status(401).json({ error: "Unauthorized" });

    const cardId = Number(req.params.cardId);
    
    await Bookmark.findOneAndDelete({ user: clientId, cardId });
    res.json({ success: true });
  } catch (err) {
    console.error("Remove bookmark error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get user bookmarks
Bookmarkrouter.get("/bookmarks", async (req: Request, res: Response) => {
  try {
    const clientId = getClientIdFromToken(req);
    if (!clientId) return res.status(401).json({ error: "Unauthorized" });

    console.log("Client ID from token:", clientId);

    
    const bookmarks = await Bookmark.find({ user: clientId });
    console.log("Found bookmarks:", bookmarks.length);
    res.json({ success: true, bookmarks });
  } catch (err) {
    console.error("Get bookmarks error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default Bookmarkrouter;