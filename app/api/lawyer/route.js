import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/connectDB";
import Lawyer from "@/models/Lawyer";

export async function GET() {
  try {
    await DbConnect();

    const lawyers = await Lawyer.find();

    return NextResponse.json({ lawyers }, { status: 200 });
  } catch (error) {
    console.error("Fetch lawyers error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
