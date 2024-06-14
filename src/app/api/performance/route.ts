import { connectDB } from "../../../config/mongoDB";
import LanguageSkill from "../../../models/languageSkill/LanguageSkill";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    const languagesSkills = await LanguageSkill.find({});

    return NextResponse.json({
      success: true,
      message: "Language skill loaded successfully",
      languagesSkills,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { skillName } = reqBody;

    const languageSkill = await LanguageSkill.findOne({ skillName });

    if (languageSkill) {
      return NextResponse.json(
        { error: "Language skill already exist" },
        { status: 400 }
      );
    }
    const newLanguageSkill = new LanguageSkill({ skillName });

    const newLanguageSkillSaved = await newLanguageSkill.save();

    return NextResponse.json({
      success: true,
      message: "Language skill created successfully",
      newLanguageSkillSaved,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
