import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/connectDB";
import Lawyer from "@/models/Lawyer";

export async function GET(_, { params }) {
  try {
    await DbConnect();

    const { lawyerId } = await params;

    const lawyer = await Lawyer.findById(lawyerId);

    if (!lawyer) {
      return NextResponse.json({ error: "Lawyer not found" }, { status: 404 });
    }

    return NextResponse.json({ lawyer }, { status: 200 });
  } catch (error) {
    console.error("Fetch lawyer by ID error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
