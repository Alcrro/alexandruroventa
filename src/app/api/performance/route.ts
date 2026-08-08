import { connectDB } from "@/config/mongoDB";
import KnowledgeCategory from "@/models/knowledgeEntry/KnowledgeCategory";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, requireAdminSecret } from "@/lib/rateLimit";

connectDB();

export async function GET(req: NextRequest) {
  const rl = await checkRateLimit(req, "general");
  if (!rl.allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  try {
    const languagesSkills = await KnowledgeCategory.find();
    return NextResponse.json({ success: true, message: "Language skill loaded successfully", languagesSkills });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!requireAdminSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
