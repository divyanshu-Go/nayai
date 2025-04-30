// app/api/appointments/[appointmentId]/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Appointment from "@/models/Appointment";
import { getUser } from "@/lib/auth/getUser";

export async function PATCH(req, { params }) {
  await connectDB();

  const authUser = await getUser(req);
  if (!authUser || !authUser._id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { status } = await req.json();
    const appointment = await Appointment.findById(params.appointmentId);

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    // Only the associated lawyer can change the status
    if (appointment.lawyerId.toString() !== authUser._id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    appointment.status = status;
    await appointment.save();

    return NextResponse.json({ success: true, appointment });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
