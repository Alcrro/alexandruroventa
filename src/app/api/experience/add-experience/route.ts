import { connectDB } from "@/config/mongoDB";
import Experience from "@/models/experience/Experience";

import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function POST(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const {
      startYear,
      endYear,
      isEnded,
      className,
      companyLogo,
      titleDescription,
      descriptionMore,
    } = await req.json();

    const idIncNumber = (await Experience.find()).length;

    if (startYear === "2000-01-01") {
      return NextResponse.json(
        { error: "you can't assign default values or null values" },
        { status: 400 }
      );
    }
    if (className === "noValue") {
      return NextResponse.json(
        { error: "you can't assign default values or null values" },
        { status: 400 }
      );
    }
    if (!titleDescription) {
      return NextResponse.json({ error: "you can't assign empty value" }, { status: 400 });
    }
    if (!descriptionMore) {
      return NextResponse.json({ error: "you can't assign empty value" }, { status: 400 });
    }

    const experience = new Experience({
      startYear,
      idIncNumber,
      endYear,
      isEnded,
      className,
      companyLogo,
      titleDescription,
      descriptionMore,
    });
    const experienceSaved = await experience.save();

    return NextResponse.json({ success: true, experienceSaved }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.errors }, { status: 500 });
  }
}
