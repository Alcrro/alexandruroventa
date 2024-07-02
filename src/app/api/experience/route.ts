import { connectDB } from "@/config/mongoDB";
import Experience from "@/models/experience/Experience";

import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function GET(req: NextRequest) {
  try {
    const experiences = await Experience.find();

    return NextResponse.json(
      {
        success: true,
        message: "Experiences loaded successfully experiences",
        experiences,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
