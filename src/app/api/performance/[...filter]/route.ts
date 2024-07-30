import { filterCategory, filterLanguageType } from "@/_lib/performance/filter";
import { pagination } from "@/_lib/performance/pagination";
import { sortPerformance } from "@/_lib/performance/sortPerformance";
import { connectDB } from "@/config/mongoDB";
import CodeVersion from "@/models/languageSkill/LanguageSkillCodeVersion";
import LanguageSKillContent from "@/models/languageSkill/LanguageSkillContent";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    let filtCategory = filterCategory(params);
    let { filterLanguageLearnt } = filterLanguageType(params);
    let { sort } = sortPerformance(params);
    let { skip, limit, page } = pagination(req, params);

    let filter: any = {};

    let findIndexOrder = params.filter.findIndex(
      (findIndex: any) => findIndex === "asc" || findIndex === "desc"
    );

    filter[params.filter[findIndexOrder]] = params.filter[findIndexOrder + 1];

    const languageSkillContent = await LanguageSKillContent.aggregate([
      {
        //filter by category
        $match: filtCategory,
      },

      {
        // filter by type of language
        $match: filterLanguageLearnt,
      },
      {
        $sort:
          Object.keys(sort)[0] !== "undefined" ||
          Object.keys(sort)[0] !== "version" ||
          Object.keys(sort)[0] !== "date"
            ? sort
            : { uniqueNumberByCategory: 1 },
      },
      {
        $facet: {
          data: [
            { $skip: skip }, // Example to skip the first 10 results for pagination
            { $limit: limit }, // Example to limit the results to 5 per page

            {
              $lookup: {
                from: "codeversions", // The collection to join
                localField: "versionCode_id", // Field from the orders collection
                foreignField: "_id", // Field from the customers collection
                as: "codeversions_details", // Output array field
              },
            },
            {
              $unwind: {
                path: "$codeversions_details", // Unwind the resulting array from lookup
                preserveNullAndEmptyArrays: true, // Optional: include orders without a matching customer
              },
            },
            {
              $project: {
                _id: "$_id",
                category: 1,
                contentTitle: 1,
                languageType: 1,
                contentDescription: 1,
                uniqueNumberByCategory: 1,
                codVersion: 1,
                slug: 1,
                codeversions_details: {
                  codVersion: "$codeversions_details.versionCode",
                  dateVersion: "$codeversions_details.date",
                },
              },
            },
            { $sort: sort },
          ],
          totalDocuments: [{ $count: "count" }],
        },
      },
      {
        $addFields: {
          totalDocuments: {
            $arrayElemAt: ["$totalDocuments.count", 0],
          }, // Extract count from array
          page: `${page}`,
          documentsPerPage: `${limit}`,
        },
      },
    ]);

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
  { params }: { params: { filter: string } }
) {
  try {
    const reqBody = await req.json();

    const {
      contentDescription,

      languageType,
      contentTitle,
      code,
      versionCode,
    } = reqBody;

    const languageVersionCode = new CodeVersion({
      code,
      versionCode,
    });

    let findLength = await LanguageSKillContent.find({
      category: params.filter[0],
    }).countDocuments();

    await languageVersionCode.save();

    const newLanguageSkillContent = new LanguageSKillContent({
      contentDescription,
      category: params.filter[0],
      contentTitle,
      uniqueNumberByCategory: findLength + 1,
      languageType,
      versionCode_id: languageVersionCode._id,
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
