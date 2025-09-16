import express, { Request, Response } from "express";
import admin from "../firebase.js"; 

const Bookmarkrouter = express.Router();
const db = admin.firestore();

// Middleware 
const authMiddleware = async (req: any, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Firebase verify error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};

// Add bookmark
Bookmarkrouter.post("/", authMiddleware, async (req: any, res: Response) => {
  try {
    const clientId = req.user.uid; 
    const { cardId, title, description, buttonText, buttonLink, category } = req.body;

    if (!cardId || !title) {
      return res.status(400).json({ error: "Missing cardId or title" });
    }

  
    const snapshot = await db
      .collection("bookmarks")
      .where("user", "==", clientId)
      .where("cardId", "==", cardId)
      .get();

    if (!snapshot.empty) return res.status(400).json({ error: "Already bookmarked" });


    const docRef = await db.collection("bookmarks").add({
      user: clientId,
      cardId,
      title,
      description,
      buttonText,
      buttonLink,
      category,
    });

    res.json({ success: true, id: docRef.id });
  } catch (err) {
    console.error("Add bookmark error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all bookmarks for a user
Bookmarkrouter.get("/", authMiddleware, async (req: any, res: Response) => {
  try {
    const clientId = req.user.uid;

    const snapshot = await db
      .collection("bookmarks")
      .where("user", "==", clientId)
      .get();

    const bookmarks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, bookmarks });
  } catch (err) {
    console.error("Get bookmarks error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete bookmark
Bookmarkrouter.delete("/:cardId", authMiddleware, async (req: any, res: Response) => {
  try {
    const clientId = req.user.uid;
    const cardId = Number(req.params.cardId);

    const snapshot = await db
      .collection("bookmarks")
      .where("user", "==", clientId)
      .where("cardId", "==", cardId)
      .get();

    if (snapshot.empty) return res.status(404).json({ error: "Bookmark not found" });

    // Delete all matching bookmarks 
    for (const doc of snapshot.docs) {
      await db.collection("bookmarks").doc(doc.id).delete();
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Delete bookmark error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default Bookmarkrouter;
