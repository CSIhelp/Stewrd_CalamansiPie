import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
  user: { type: String, required: true },  
  cardId: { type: Number, required: true }, 
  title: String,
  description: String,
  buttonText: String,
  buttonLink: String,
  category: String,
});

export default mongoose.model("Bookmark", BookmarkSchema);