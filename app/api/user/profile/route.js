import { getUser } from "@/lib/auth/getUser";
import DbConnect from "@/lib/db/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

 
export async function GET(req) {
    try {
      await DbConnect();
  
      // Get user from JWT in cookies
      const authUser = await getUser(req);
      if (!authUser || !authUser._id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      // Fetch full user profile from DB
      const user = await User.findById(authUser._id).select("-password");
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      console.error("Fetch user profile error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }