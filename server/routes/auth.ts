import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import admin from "../firebase.js";
import { readFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";

import { QuerySnapshot, DocumentData } from "firebase-admin/firestore";

dotenv.config();

const db = admin.firestore();
const router = express.Router();


// Presence tracking 
const lastSeenMap: Record<string, number> = {};
const TIMEOUT = 15 * 60 * 1000; // 15 minutes

// Background checker: logs out inactive users
setInterval(async () => {
  const now = Date.now();

  for (const [userId, lastSeen] of Object.entries(lastSeenMap)) {
    if (now - lastSeen > TIMEOUT) {
      try {
        await db.collection("users").doc(userId).update({
          isOnline: false,
          currentSessionId: null,
        });
        console.log(`Auto-logged out ${userId}`);
        delete lastSeenMap[userId];
      } catch (err) {
        console.error("Failed to auto logout:", err);
      }
    }
  }
},15 * 60 * 1000); 

// Middleware
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Add user account
router.post("/userManagement", async (req, res) => {
  try {
    const { ClientId, Company, Password, Role } = req.body;

    const uid = `client_${ClientId}`;

    // Check if user already exists
    const userDoc = await db.collection("users").doc(uid).get();
    if (userDoc.exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Store user details in Firestore
    await db
      .collection("users")
      .doc(uid)
      .set({
        ClientId,
        Company,
        Password: hashedPassword,
        Role: Role || "user",
        Active: true,
        isFirstLogin: true,
      });

    res.json({ success: true, message: "User registered" });
  } catch (err: any) {
    console.error("User registration error:", err);
    res
      .status(500)
      .json({ error: "User registration failed", details: err.message });
  }
});

// Get all users
router.get("/userManagement", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map((doc) => doc.data());
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Log in
router.post("/login", async (req, res) => {
  try {
    const { ClientId, Password, forceLogout } = req.body; 
    const uid = `client_${ClientId}`;
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(401).json({ error: "Invalid ClientId" });
    }

    const user = userDoc.data() as any;

    if (!user.Active) {
      return res
        .status(403)
        .json({ success: false, error: "Account is deactivated" });
    }

    const valid = await bcrypt.compare(Password, user.Password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const now = Date.now();
  
    const isActiveSession = user.isOnline;

    //  Block only if another session is active AND forceLogout is not requested
    if (isActiveSession && !forceLogout) {
      return res.status(403).json({
        success: false,
        error: "User already logged in on another device",
      });
    }

    // If forceLogout is requested, clear old session
    if (isActiveSession && forceLogout) {
      await userRef.update({
        isOnline: false,
        currentSessionId: null,
      });
    }

    const sessionId = uuidv4();
    lastSeenMap[uid] = now;

    // ✅ Mark new session online
    await userRef.update({
      isOnline: true,
      lastSeen: now,
      currentSessionId: sessionId,
    });

    const customToken = await admin.auth().createCustomToken(uid, {
      ClientId: user.ClientId,
      role: user.Role,
      company: user.Company,
      sessionId,
    });

    res.json({
      success: true,
      customToken,
      role: user.Role,
      firstLogin: user.isFirstLogin,
      company: user.Company,
      sessionId,
    });
  } catch (err: any) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});


router.post("/online", authMiddleware, async (req, res) => {
  try {
    const decoded = req.user as any; 
    const uid = `client_${decoded.ClientId}`;
    const sessionId = decoded.sessionId; 
    const now = Date.now();

    const userRef = db.collection("users").doc(uid);
    await userRef.update({
      isOnline: true,
      lastSeen: now,
      currentSessionId: sessionId,
    });

    lastSeenMap[uid] = now;

    res.json({ success: true });
  } catch (err) {
    console.error("Online route error:", err);
    res.status(500).json({ success: false, error: "Failed to update status" });
  }
});

// Log Out
router.post("/logout", async (req, res) => {
  let body: any = req.body;
  try {
    if (typeof body === "string") {
      body = JSON.parse(body);
    }
  } catch (e) {
    console.error("Failed to parse body:", req.body);
  }
  try {
    const { sessionId } = body;

    if (sessionId) {
      const snapshot = await db
        .collection("users")
        .where("currentSessionId", "==", sessionId)
        .limit(1)
        .get();

      if (snapshot.empty) {
        return res
          .status(404)
          .json({ success: false, error: "Session not found" });
      }

      const userRef = snapshot.docs[0].ref;
      await userRef.update({ isOnline: false, currentSessionId: null });

      return res.json({ success: true, message: "Auto logout successful" });
    }

    // fallback to token-based logout
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    const uid = `client_${decoded.ClientId}`;

    await db.collection("users").doc(uid).update({ isOnline: false });

    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ success: false, error: err });
  }
});


// Deactivate user
router.patch("/userManagement/deactivate/:clientId", async (req, res) => {
  try {
    const uid = `client_${req.params.clientId}`;
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    await userRef.update({ Active: false });

    res.json({
      success: true,
      message: `User ${req.params.clientId} deactivated`,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Failed to deactivate user",
      details: err.message,
    });
  }
});

//Delete User
router.delete("/userManagement/:clientId", async (req, res) => {
  try {
    const uid = `client_${req.params.clientId}`;
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    await userRef.delete();

    res.json({ success: true, message: `User ${req.params.clientId} deleted` });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Failed to delete  user",
      details: err.message,
    });
  }
});

// Reactivate user
router.patch("/userManagement/reactivate/:clientId", async (req, res) => {
  try {
    const uid = `client_${req.params.clientId}`;
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    await userRef.update({ Active: true });

    res.json({
      success: true,
      message: `User ${req.params.clientId} reactivated`,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Failed to reactivate user",
      details: err.message,
    });
  }
});

//Reset password
router.patch("/userManagement/:clientId", authMiddleware, async (req, res) => {
  try {
    const { clientId } = req.params;
    const { Password, adminPassword } = req.body;
    const uid = `client_${clientId}`;

    // Logged-in user (from token)
    const decodedUser = req.user as any;
    const loggedInUid = `client_${decodedUser.ClientId}`;
    const adminRef = db.collection("users").doc(loggedInUid);

    const adminDoc = await adminRef.get();
    if (!adminDoc.exists) {
      return res.status(403).json({ success: false, error: "Admin not found" });
    }

    const adminData = adminDoc.data() as any;
    if (adminData.Role !== "admin") {
      return res.status(403).json({ success: false, error: "Not authorized" });
    }

    // Verify admin password
    const validAdmin = await bcrypt.compare(adminPassword, adminData.Password);
    if (!validAdmin) {
      return res
        .status(403)
        .json({ success: false, error: "Invalid admin password" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(Password, 10);

    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res
        .status(404)
        .json({ success: false, error: "Target user not found" });
    }

    // Update password
    await userRef.update({ Password: hashedPassword, isFirstLogin: true });

    res.json({ success: true, message: `Password for ${clientId} updated` });
  } catch (err: any) {
    res
      .status(500)
      .json({ success: false, error: "Server error", details: err.message });
  }
});

// Get user dashboard info
router.get("/Dashboard", authMiddleware, async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Change password on first login
router.patch(
  "/firstLogin",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { oldPassword, newPassword } = req.body;

      // Get clientId from decoded token
      const decodedUser = req.user as any;
      const clientId = decodedUser.ClientId;
      const uid = `client_${clientId}`;

      // Get user document
      const userRef = db.collection("users").doc(uid);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      const userData = userDoc.data() as any;

      // Check old password
      const valid = await bcrypt.compare(oldPassword, userData.Password);
      if (!valid) {
        return res
          .status(401)
          .json({ success: false, error: "Invalid current password" });
      }

      // Hash new password and update
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userRef.update({ Password: hashedPassword, isFirstLogin: false });

      res.json({ success: true, message: "Password updated successfully" });
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, error: "Server error", details: err.message });
    }
  }
);

//last seen
router.post("/ping", authMiddleware, (req, res) => {
  try {
    const decoded = req.user as any;
    const uid = `client_${decoded.ClientId}`;
    lastSeenMap[uid] = Date.now();
    res.json({ success: true, message: "Ping received" });
  } catch (err) {
    console.error("Ping error:", err);
    res.status(500).json({ success: false, error: "Ping failed" });
  }
});
export default router;
