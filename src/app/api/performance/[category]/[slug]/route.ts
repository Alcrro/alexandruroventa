import { connectDB } from "@/config/mongoDB";
import CodeVersion from "@/models/languageSkill/LanguageSkillCodeVersion";
import LanguageSKillContent from "@/models/languageSkill/LanguageSkillContent";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(
  _req: NextRequest,
  { params }: { params: { category: string; slug: string } }
) {
  try {
    const entry = (await LanguageSKillContent.findOne({
      slug: params.slug,
      category: params.category,
    }).lean()) as any;

    if (!entry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const codeVersion = entry.versionCode_id
      ? await CodeVersion.findById(entry.versionCode_id).lean()
      : null;

    return NextResponse.json({ success: true, entry, codeVersion });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
