import { setAuthCookie } from "@/lib/auth/cookies";
import { verifyPassword } from "@/lib/auth/password";
import { generateToken } from "@/lib/auth/token";
import DbConnect from "@/lib/db/connectDB";
import Lawyer from "@/models/Lawyer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await DbConnect();

    const lawyer = await Lawyer.findOne({ email });
    if (!lawyer || !lawyer.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await verifyPassword(password, lawyer.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await generateToken({
      _id: lawyer._id,
      name: lawyer.name,
      email: lawyer.email,
      role: "lawyer",
    });

    const response = NextResponse.json(
      {
        message: "Logged in successfully",
        lawyer: {
          id: lawyer._id,
          email: lawyer.email,
          role: "lawyer",
        },
      },
      { status: 200 }
    );

    response.cookies.set(setAuthCookie(token));
    return response;
  } catch (error) {
    console.error("Lawyer login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
