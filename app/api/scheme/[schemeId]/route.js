import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/connectDB";
import { getUser } from "@/lib/auth/getUser";
import Scheme from "@/models/scheme";

// GET /api/schemes/[schemeId]
export async function GET(req, { params }) {
  try {
    await DbConnect();

    const { schemeId } = await params;

    const scheme = await Scheme.findById(schemeId);
    if (!scheme) {
      return NextResponse.json({ error: "Scheme not found" }, { status: 404 });
    }

    return NextResponse.json(scheme, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch scheme" },
      { status: 500 }
    );
  }
}

// PUT /api/schemes/[schemeId]
export async function PUT(req, { params }) {
  try {
    await DbConnect();
    const user = await getUser(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { schemeId } = await params;

    const body = await req.json();
    const updatedScheme = await Scheme.findByIdAndUpdate(
      schemeId,
      { ...body },
      { new: true }
    );

    if (!updatedScheme) {
      return NextResponse.json({ error: "Scheme not found" }, { status: 404 });
    }

    return NextResponse.json(updatedScheme, { status: 200 });
  } catch (error) {
    console.error("Error updating scheme:", error);
    return NextResponse.json(
      { error: "Failed to update scheme" },
      { status: 500 }
    );
  }
}

// DELETE /api/schemes/[schemeId]
export async function DELETE(req, { params }) {
  try {
    await DbConnect();
    const user = await getUser(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { schemeId } = await params;
    const deleted = await Scheme.findByIdAndDelete(schemeId);
    if (!deleted) {
      return NextResponse.json({ error: "Scheme not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Scheme deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete scheme" },
      { status: 500 }
    );
  }
}