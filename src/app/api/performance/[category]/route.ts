import { connectDB } from "@/config/mongoDB";
import KnowledgeEntry from "@/models/knowledgeEntry/KnowledgeEntry";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(
  _req: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const entries = await KnowledgeEntry.aggregate([
      { $match: { category: params.category } },
      {
        $lookup: {
          from: "codeversions",
          localField: "versionCode_id",
          foreignField: "_id",
          as: "codeversions_details",
        },
      },
      {
        $unwind: {
          path: "$codeversions_details",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          category: 1,
          contentTitle: 1,
          contentDescription: 1,
          languageType: 1,
          uniqueNumberByCategory: 1,
          slug: 1,
          codeversions_details: {
            codVersion: "$codeversions_details.versionCode",
            dateVersion: "$codeversions_details.date",
          },
        },
      },
      { $sort: { uniqueNumberByCategory: 1 } },
    ]);

    return NextResponse.json({ success: true, entries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
