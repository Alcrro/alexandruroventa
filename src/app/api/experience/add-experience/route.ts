import { connectDB } from "@/config/mongoDB";
import Experience from "@/models/experience/Experience";

import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const {
      startYear,
      endYear,
      isEnded,
      className,
      titleDescription,
      descriptionMore,
    } = reqBody;

    const incNumber = (await Experience.find()).length;
    const saveNumber = incNumber;

    saveNumber === incNumber ? incNumber + 2 : incNumber;

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
      return NextResponse.json(
        { error: "you can't assign empty value" },
        { status: 400 }
      );
    }
    if (!descriptionMore) {
      return NextResponse.json(
        { error: "you can't assign empty value" },
        { status: 400 }
      );
    }

    // const experiences = new Experience({
    //   startYear,
    //   idIncNumber: saveNumber,
    //   endYear,
    //   isEnded,
    //   className,
    //   titleDescription,
    //   descriptionMore,
    // });
    // const experienceSaved = await experiences.save();
    return NextResponse.json(
      {
        success: true,
        message: "Add the cod from the email!",
        // experienceSaved,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.errors }, { status: 500 });
  }
}
