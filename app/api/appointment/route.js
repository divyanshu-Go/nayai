// app/api/appointments/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Appointment from "@/models/Appointment";
import { getUser } from "@/lib/auth/getUser";

export async function POST(req) {
  await connectDB();

  const authUser = await getUser(req);
  if (!authUser || !authUser._id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { lawyerId, date, timeSlot, issueSummary } = await req.json();

    const newAppointment = await Appointment.create({
      userId: authUser._id,
      lawyerId,
      date,
      timeSlot,
      issueSummary,
    });

    return NextResponse.json({ success: true, appointment: newAppointment });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req){
  connectDB();
  try {
    const authUser= await getUser(req);
    const appointments =await Appointment.find();
    NextResponse.json(appointments)
    
  } catch (error) {
    
  }
}