import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/connectDB";
import Lawyer from "@/models/Lawyer";
import { getUser } from "@/lib/auth/getUser";
import { generateToken } from "@/lib/auth/token";
import { setAuthCookie } from "@/lib/auth/cookies";

export async function PUT(req) {
  try {
    await DbConnect();

    const user = await getUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updates = await req.json();

    const updatedLawyer = await Lawyer.findOneAndUpdate(
      { _id: user._id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedLawyer) {
      return NextResponse.json({ error: "Lawyer not found" }, { status: 404 });
    }

    const token = await generateToken(updatedLawyer);

    const response = NextResponse.json({ message: "Profile updated", lawyer: updatedLawyer }, { status: 200 });

    response.cookies.set(setAuthCookie(token))

    return response;
  } catch (error) {
    console.error("Update lawyer error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
