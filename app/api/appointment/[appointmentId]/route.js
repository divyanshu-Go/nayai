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
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
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

export async function DELETE(req, { params }) {
  await connectDB();

  const authUser = await getUser(req);
  if (!authUser || !authUser._id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appointmentId = (await params).appointmentId;
  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment || authUser._id != appointment.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await Appointment.findByIdAndDelete(appointmentId);

    return NextResponse.json(
      { message: "Appointment deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}




export async function PUT(req, { params }) {
  await connectDB();

  const authUser = await getUser(req);
  if (!authUser || !authUser._id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const appointmentId = (await params).appointmentId;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment || authUser._id != appointment.userId.toString()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { date, timeSlot, issueSummary, lawyerId } = body;

    // Optional: Validate fields before updating
    if (!date || !timeSlot || !issueSummary || !lawyerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    appointment.date = date;
    appointment.timeSlot = timeSlot;
    appointment.issueSummary = issueSummary;
    appointment.lawyerId = lawyerId;

    await appointment.save();

    return NextResponse.json(
      { message: 'Appointment updated successfully', appointment },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



export async function GET(req, { params }) {
  await connectDB();


  const appointmentId = (await params).appointmentId;
  try {
    const appointment = await Appointment.findById(appointmentId).populate("userId lawyerId", "name email");

    if (!appointment ) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 401 });
    }

    return NextResponse.json(
      {appointment}, { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
