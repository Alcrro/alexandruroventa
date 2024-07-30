import { connectDB } from "@/config/mongoDB";
import Skill from "@/models/skills/Skills";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function GET(req: NextRequest) {
  try {
    const pipeline: any = {
      $sort: {
        skillName: 1,
      },
    };

    const skills = await Skill.aggregate([pipeline]);

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

    const newSkill = new Skill({
      skillName,
    });

    if(newSkill.skillName !== ""){
      
    }

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
