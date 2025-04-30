// models/Lawyer.js
import mongoose from "mongoose";

const lawyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  languages: [{ type: String }],
  expertise: [{ type: String }],
  experienceYears: { type: Number },
  RegistrationNo: { type: String },
  gender: { type: String },
  age: { type: Number },
  role: { type: String, default: "lawyer" },
  category: [{ type: String }],

  bio: { type: String },
  profilePhoto: { type: String },
  availability: { type: String },

  isVerified: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lawyer || mongoose.model("Lawyer", lawyerSchema);
