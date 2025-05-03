import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/connectDB";
import Lawyer from "@/models/Lawyer";
import { getUser } from "@/lib/auth/getUser";

export async function GET(req) {
  try {
    await DbConnect();

    const user = await getUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const lawyer = await Lawyer.findOne({ _id: user._id }).select("-password");

    if (!lawyer ) {
      return NextResponse.json({ error: "Lawyer profile not found" }, { status: 404 });
    }

    return NextResponse.json({ lawyer }, { status: 200 });
  } catch (error) {
    console.error("Get lawyer profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
