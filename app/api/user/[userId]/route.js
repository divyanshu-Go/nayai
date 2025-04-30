import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/connectDB";
import User from "@/models/User";

export async function GET(_, { params }) {
  try {
    const { userId } = await params;
    await DbConnect();

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
