import { connectDB } from "@/config/mongoDB";
import Experience from "@/models/experience/Experience";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

connectDB();

function checkAuth(req: NextRequest) {
  return req.headers.get("x-admin-secret") === process.env.ADMIN_SECRET;
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const { titleDescription, companyLogo, descriptionMore, className, startYear, endYear, isEnded } =
      await req.json();

    const update: Record<string, unknown> = {
      titleDescription,
      companyLogo,
      descriptionMore,
      className,
      startYear,
      isEnded,
    };

    if (isEnded) {
      update.currentYear = new Date();
      update.endYear = null;
    } else {
      update.currentYear = null;
      update.endYear = endYear;
    }

    const updated = await Experience.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true, updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const deleted = await Experience.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
