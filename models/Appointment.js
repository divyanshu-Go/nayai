// models/Appointment.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
    required: true,
  },

  date: { type: Date, required: true },
  timeSlot: { type: String }, 
  issueSummary: { type: String },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed"],
    default: "pending",
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
