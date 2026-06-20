import { connectDB } from "@/config/mongoDB";
import KnowledgeEntry from "@/models/knowledgeEntry/KnowledgeEntry";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(
  req: NextRequest,
  { params }: { params: { category: string; slug: string } }
) {
  try {
    const { rating } = await req.json();
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
    }

    const entry = await KnowledgeEntry.findOneAndUpdate(
      { slug: params.slug, category: params.category },
      { $inc: { ratingSum: rating, ratingCount: 1 } },
      { new: true }
    );

    if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const average = Math.round((entry.ratingSum / entry.ratingCount) * 100) / 100;
    return NextResponse.json({ success: true, average, count: entry.ratingCount });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
