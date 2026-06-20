import { connectDB } from "@/config/mongoDB";
import KnowledgeEntryCodeVersion from "@/models/knowledgeEntry/KnowledgeEntryCodeVersion";
import KnowledgeEntry from "@/models/knowledgeEntry/KnowledgeEntry";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(
  _req: NextRequest,
  { params }: { params: { category: string; slug: string } }
) {
  try {
    const entry = (await KnowledgeEntry.findOne({
      slug: params.slug,
      category: params.category,
    }).lean()) as any;

    if (!entry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const codeVersion = entry.versionCode_id
      ? await KnowledgeEntryCodeVersion.findById(entry.versionCode_id).lean()
      : null;

    const ratingAverage =
      (entry.ratingCount ?? 0) > 0
        ? Math.round((entry.ratingSum / entry.ratingCount) * 100) / 100
        : 0;

    return NextResponse.json({
      success: true,
      entry: { ...entry, ratingAverage, ratingCount: entry.ratingCount ?? 0 },
      codeVersion,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
