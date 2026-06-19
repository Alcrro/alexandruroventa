import { connectDB } from "@/config/mongoDB";
import Skill from "@/models/skills/Skills";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET() {
  try {
    const skills = await Skill.find().sort({ category: 1, skillName: 1 }).lean();
    return NextResponse.json({ success: true, skills }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { skillName, category, level, icon } = await req.json();

    if (!skillName || !category || !level) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newSkill = await new Skill({ skillName, category, level, icon: icon ?? "" }).save();
    return NextResponse.json({ success: true, skill: newSkill }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
