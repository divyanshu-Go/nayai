// app/api/appointments/user/[userId]/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Appointment from "@/models/Appointment";
import Lawyer from "@/models/Lawyer";
import { getUser } from "@/lib/auth/getUser";

export async function GET(req) {
  await connectDB();

  const authUser = await getUser(req);
  if (!authUser || !authUser._id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {

    const appointments = await Appointment.find({ userId: authUser._id })
      .populate("lawyerId", "name email")
      .sort({ date: -1 });

    return NextResponse.json( {appointments },{status: 200} );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
