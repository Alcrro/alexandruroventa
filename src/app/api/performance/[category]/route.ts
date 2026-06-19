import { connectDB } from "@/config/mongoDB";
import LanguageSKillContent from "@/models/languageSkill/LanguageSkillContent";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const sort = searchParams.get("sort") ?? "asc";
    const sortBy = searchParams.get("sortBy") ?? "uniqueNumberByCategory";

    const match: Record<string, unknown> = { category: params.category };
    if (type && type !== "all") match.languageType = type;

    const sortOrder = sort === "desc" ? -1 : 1;
    const sortStage: Record<string, 1 | -1> = {};
    if (sortBy === "contentTitle") {
      sortStage.contentTitle = sortOrder;
    } else if (sortBy === "date") {
      sortStage["codeversions_details.dateVersion"] = sortOrder;
    } else {
      sortStage.uniqueNumberByCategory = sortOrder;
    }

    const entries = await LanguageSKillContent.aggregate([
      { $match: match },
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
      { $sort: sortStage },
    ]);

    return NextResponse.json({ success: true, entries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
