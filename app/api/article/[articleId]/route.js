import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/connectDB";
import {getUser} from "@/lib/auth/getUser";
import LegalArticle from "@/models/LegalArticle";

// GET /api/articles/[articleId]
export async function GET(req, { params }) {
  try {
    await DbConnect();

    const {articleId} = await params;

    const article = await LegalArticle.findById(articleId);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}

// PUT /api/articles/[articleId]
export async function PUT(req, { params }) {
  try {
    await DbConnect();
    const user = await getUser(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {articleId} = await params;


    const body = await req.json();
    const updatedArticle = await LegalArticle.findByIdAndUpdate(
      articleId,
      { ...body, last_updated: new Date() },
      { new: true }
    );

    if (!updatedArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[articleId]
export async function DELETE(req, { params }) {
  try {
    await DbConnect();
    const user = await getUser(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deleted = await LegalArticle.findByIdAndDelete(params.articleId);
    if (!deleted) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Article deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
