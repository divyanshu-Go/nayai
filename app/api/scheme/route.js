import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/connectDB";
import { getUser } from "@/lib/auth/getUser";
import Scheme from "@/models/scheme";

// GET /api/schemes
export async function GET() {
  try {
    await DbConnect();
    const schemes = await Scheme.find().sort({ createdAt: -1 });
    return NextResponse.json({schemes}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch schemes" }, { status: 500 });
  }
}

// POST /api/schemes (admin only)
export async function POST(req) {
  try {
    await DbConnect();

    const user = await getUser(req);

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await req.json();
    const newScheme = new Scheme({
      ...body,
      createdAt: new Date(),
    });
    
    const saved = await newScheme.save();
    console.log("Scheme saved successfully:", saved._id);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("Error creating scheme:", error);
    return NextResponse.json({ error: "Failed to create scheme" }, { status: 500 });
  }
}