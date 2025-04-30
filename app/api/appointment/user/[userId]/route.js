// app/api/appointments/user/[userId]/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Appointment from "@/models/Appointment";
import { getUser } from "@/lib/auth/getUser";

export async function GET(req, { params }) {
  await connectDB();

  const authUser = await getUser(req);
  if (!authUser || !authUser._id || authUser._id !== params.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const appointments = await Appointment.find({ userId: params.userId })
      .populate("lawyerId", "name email")
      .sort({ date: -1 });

    return NextResponse.json({ success: true, appointments });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
