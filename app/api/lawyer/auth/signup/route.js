import { setAuthCookie } from "@/lib/auth/cookies";
import { hashPassword } from "@/lib/auth/password";
import { generateToken } from "@/lib/auth/token";
import DbConnect from "@/lib/db/connectDB";
import Lawyer from "@/models/Lawyer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      name,
      email,
      password,
      phone,
      location,
      languages,
      expertise,
      experienceYears,
      RegistrationNo,
      gender,
      age,
      role,
      category,
      bio,
      profilePhoto,
      availability,
    } = await req.json();

    if (
      !name ||
      !email ||
      !email.includes("@") ||
      !password ||
      password.length < 8
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await DbConnect();

    // Check if lawyer already exists
    const existing = await Lawyer.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Lawyer already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const lawyer = await Lawyer.create({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
      languages,
      expertise,
      experienceYears,
      RegistrationNo,
      gender,
      age,
      role: 'lawyer',
      category,
      bio,
      profilePhoto,
      availability,
      isVerified: false,
    });

    const token = await generateToken({
      _id: lawyer._id,
      name: lawyer.name,
      email: lawyer.email,
      role: "lawyer",
    });

    const response = NextResponse.json(
      {
        message: "Lawyer signed up successfully",
        lawyer: {
          id: lawyer._id,
          email: lawyer.email,
          role: "lawyer",
        },
      },
      { status: 201 }
    );

    response.cookies.set(setAuthCookie(token));
    return response;
  } catch (error) {
    console.error("Lawyer signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
