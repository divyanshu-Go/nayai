import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/connectDB";
import User from "@/models/User";

export async function GET() {
  try {
    await DbConnect();

    const users = await User.find().select("-password");

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
