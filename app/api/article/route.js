import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/connectDB";
import LegalArticle from "@/models/LegalArticle";
import { getUser } from "@/lib/auth/getUser";

// GET /api/articles
export async function GET() {
  try {
    await DbConnect();
    const articles = await LegalArticle.find().sort({ last_updated: -1 }).populate("author", "name email");
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

// POST /api/article (admin only)
export async function POST(req) {
  try {
    await DbConnect();
    const user = await getUser(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const newArticle = new LegalArticle({
      ...body,
      author: user._id,
      last_updated: new Date(),
    });
    
    const saved = await newArticle.save();
    console.log("Article saved successfully:", saved._id);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}