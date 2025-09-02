import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "../models/User"; 
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const router = express.Router();

// add user account

router.post("/userManagement", async (req, res) => {

    try{
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
    res.json({success:true, message: "User registered"});
} catch (err: any){
    console.error("User registration error:", err); 
    res.status (500).json({error: "User registrtion failed ", details: err.message, });
}
});

// Log In
router.post('/login', async (req, res) => {
    try {
        const { ClientId, Password} = req.body;
        const user = await User.findOne ({ ClientId });
        if (!user) return res.status(401).json({error: 'Invalid Client Id'})  
    
            const valid = await bcrypt.compare(Password, user.Password);
            if (!valid) return res.status(401).json({ error: "Invalid password" }); 

            const token = jwt.sign (
                {id: user.ClientId, role: user.Role},
                process.env.JWT_SECRET!,
                {expiresIn: "1h"}

            );
            res.json ({ success: true, token, role: user.Role });
        } catch (err) {
            res.status(500).json({ error: "LogIn Failed "})
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