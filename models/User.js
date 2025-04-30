// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  role: {
    type: String,
    enum: ["user", "lawyer", "admin", "developer"],
    default: "user",
  },

  profession: { type: String },
  region: { type: String },
  religion: { type: String },
  gender: { type: String },
  age: { type: Number },

  savedArticles: [
    { type: mongoose.Schema.Types.ObjectId, ref: "LegalArticle" },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
