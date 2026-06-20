import { connectDB } from "@/config/mongoDB";
import KnowledgeCategory from "@/models/knowledgeEntry/KnowledgeCategory";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(_req: NextRequest) {
  try {
    const languagesSkills = await KnowledgeCategory.find();
    return NextResponse.json({ success: true, message: "Language skill loaded successfully", languagesSkills });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { skillName } = await req.json();

    const existing = await KnowledgeCategory.findOne({ skillName });
    if (existing) {
      return NextResponse.json({ error: "Language skill already exist" }, { status: 400 });
    }

    const newCategory = new KnowledgeCategory({ skillName });
    const newLanguageSkillSaved = await newCategory.save();

    return NextResponse.json({ success: true, message: "Language skill created successfully", newLanguageSkillSaved });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
