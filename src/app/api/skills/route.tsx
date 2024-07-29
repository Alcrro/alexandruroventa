import { connectDB } from "@/config/mongoDB";
import Skill from "@/models/skills/Skills";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function GET(req: NextRequest) {
  try {
    const { ip, nextUrl } = req;
    nextUrl.searchParams.set("x-forwarded-for", ip!);

    const skills = await Skill.find({});
    return NextResponse.json(
      {
        success: true,
        message: "Load skills successfully",
        skills,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const { skillName } = reqBody;

    const headersList = headers();
    const ip = headersList.get("x-forwarded-for");
    console.log(ip);

    const newSkill = new Skill({
      skillName,
    });

    const skillSaved = await newSkill.save();

    return NextResponse.json(
      {
        success: true,
        message: "successfully added",
        skillSaved,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 400 });
  }
}
