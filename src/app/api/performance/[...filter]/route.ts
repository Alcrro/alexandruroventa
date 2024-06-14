import algorithmParamsAPI from "@/_lib/languageSkill/algorithmParamsAPI";
import { connectDB } from "@/config/mongoDB";
import LanguageSKillContent from "@/models/languageSkill/LanguageSkillContent";

import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(req: NextRequest, { params }: { params: any }) {
  const filter = algorithmParamsAPI(params.filter);

  try {
    const languageSkillContent = await LanguageSKillContent.find(filter?.obj);

    return NextResponse.json({
      success: true,
      message: "Language skill created successfully",
      languageSkillContent,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const reqBody = await req.json();
    const { name, description, category, languageType } = reqBody;
    const newLanguageSkillContent = new LanguageSKillContent({
      name,
      description,
      category,
      languageType,
    });
    const languageSkillContentSaved = await newLanguageSkillContent.save();
    return NextResponse.json({
      success: true,
      message: "Language skill created successfully",
      languageSkillContentSaved,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.errors }, { status: 500 });
  }
}
