import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { authenticateToken } from "../authentication/AuthenticationToken"


const router = express.Router();




// add user account

router.post("/userManagement", async (req, res) => {

    try {
        const { ClientId, Company, Password, Role } = req.body;

        //Password Hashing
        const hashedPassword = await bcrypt.hash(Password, 10);

        const user = new User({
            ClientId,
            Company,
            Password: hashedPassword,
            Role: Role || "user",
        });

        await user.save();
        res.json({ success: true, message: "User registered" });
    } catch (err: any) {
        console.error("User registration error:", err);
        res.status(500).json({ error: "User registrtion failed ", details: err.message, });
    }
});

// Get users
router.get('/userManagement', async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Log In
router.post('/login', async (req, res) => {
    try {
        const { ClientId, Password } = req.body;
        const user = await User.findOne({ ClientId });
        if (!user) return res.status(401).json({ error: 'Invalid Client Id' })
        if (!user.Active) {
            return res.status(403).json({ success: false, error: 'Account is deactivated' });
        }
        const valid = await bcrypt.compare(Password, user.Password);
        if (!valid) return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign(
            { id: user.ClientId, role: user.Role, company: user.Company },
            process.env.JWT_SECRET!,
            { expiresIn: "4h" }

        );
        res.json({ success: true, token, role: user.Role });
    } catch (err) {
        res.status(500).json({ error: "LogIn Failed " })
    }
});

//Delete User
router.delete("/userManagement/:clientId", async (req, res) => {
    try {
        const { clientId } = req.params;
        const user = await User.findOneAndDelete({ ClientId: clientId });

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        console.log(`❌ User ${clientId} deleted`);
        res.json({ success: true, message: `User ${clientId} deleted successfully` });
    } catch (err: any) {
        console.error("User deletion error:", err);
        res.status(500).json({ success: false, error: "Failed to delete user", details: err.message });
    }
});

// Deactivate user
router.patch("/userManagement/deactivate/:clientId", async (req, res) => {
    try {
        const { clientId } = req.params;
        const user = await User.findOneAndUpdate(
            { ClientId: clientId },
            { Active: false },
            { new: true }
        );
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        console.log(`⚠️ User ${clientId} deactivated`);
        res.json({ success: true, message: `User ${clientId} deactivated`, user });
    } catch (err: any) {
        console.error("User deactivation error:", err);
        res.status(500).json({ success: false, error: "Failed to deactivate user", details: err.message });
    }
});


// Reactivate user

router.patch("/userManagement/reactivate/:clientId", async (req, res) => {
    try {
        const { clientId } = req.params;
        const user = await User.findOneAndUpdate(
            { ClientId: clientId },
            { Active: true },
            { new: true }
        );
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        console.log(`✅ User ${clientId} reactivated`);
        res.json({ success: true, message: `User ${clientId} reactivated`, user });
    } catch (err: any) {
        console.error("User reactivation error:", err);
        res.status(500).json({ success: false, error: "Failed to reactivate user", details: err.message });
    }
});

// Reset Password
router.patch("/userManagement/:clientId", async (req, res) => {
    try {
        const { clientId } = req.params;
        const { Password, adminPassword } = req.body;

        // Authenticate admin
        const admin = await User.findOne({ Role: "admin" });
        if (!admin || !(await bcrypt.compare(adminPassword, admin.Password))) {
            return res.status(403).json({ success: false, error: "Invalid admin credentials" });
        }

        // Password hashing
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Update user password
        const user = await User.findOneAndUpdate(
            { ClientId: clientId },
            { Password: hashedPassword },
            { new: true }
        );
        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        res.json({ success: true, message: "Password updated by admin" });
    } catch (err:any) {
        res.status(500).json({ success: false, error: "Server error", details: err.message });
    }
});

// Get user data 
router.get("/Dashboard", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        res.json({ success: true, user: decoded });
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
});




export default router;