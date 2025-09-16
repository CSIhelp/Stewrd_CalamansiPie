import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document { 
    _id: mongoose.Types.ObjectId;
    ClientId: string;
    Company: string;
    Password: string;
    Role: "user" | "admin";
    Active: boolean;
    isFirstLogin: boolean;
    CreatedAt: Date;
}

const UserSchema: Schema = new mongoose.Schema({
    ClientId: { type: String, required: true, unique: true },
    Company: { type: String, required: true },
    Password: { type: String, required: true },
    Role: { type: String, enum: ["user", "admin"], default: "user", required: true },
    Active: { type: Boolean, default: true },
    isFirstLogin: { type: Boolean, default: true }, 
    CreatedAt: { type: Date, default: Date.now },
});

UserSchema.pre<IUser>("save", function(next) {
    if (this.isNew) {
        this.isFirstLogin = this.Role === "admin";
    }
    next();
});

export default mongoose.model<IUser>("User", UserSchema);
