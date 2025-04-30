import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/connectDB";
import User from "@/models/User";
import { getUser } from "@/lib/auth/getUser";
import { generateToken } from "@/lib/auth/token";
import { setAuthCookie } from "@/lib/auth/cookies";

export async function PUT(req) {
  try {
    await DbConnect();

    const userFromToken = await getUser(req);
    if (!userFromToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = userFromToken._id;
    const updates = await req.json();

    const allowedFields = ["name", "email"]; // Add more fields if allowed
    const updateData = {};

    for (let key of allowedFields) {
      if (updates[key]) updateData[key] = updates[key];
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

        const token = await generateToken(updatedUser);
        
        const response =NextResponse.json(
            { message: "Profile updated", user: updatedUser },
            { status: 200 }
        );
        
        response.cookies.set(setAuthCookie(token));

    return response;
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
