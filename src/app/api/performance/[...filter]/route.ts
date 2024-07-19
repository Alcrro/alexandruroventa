import { connectDB } from "@/config/mongoDB";
import CodeVersion from "@/models/languageSkill/LanguageSkillCodeVersion";
import LanguageSKillContent from "@/models/languageSkill/LanguageSkillContent";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    let obj: any = {};
    obj[params.filter[0]] = params.filter[1];
    const { searchParams } = new URL(req.url);
    const pageNumber = searchParams.get("page");

    let page: number = Number(pageNumber) || 1;

    let docPerPage = 20;
    let skip = docPerPage * (page - 1);
    let filter: any = {};
    let limit =
      params.filter.indexOf("limit") === -1
        ? 20
        : Number(
            params.filter[params.filter.indexOf("limit") + 1]
              .match(/\d+/g)
              .toString()
          );

    let findIndex: number = params.filter.findIndex(
      (findIndex: any) => findIndex === "languageType"
    );

    let filterMatch = params.filter.findIndex(
      (findIndex: any) => findIndex === "asc" || findIndex === "desc"
    );

    let sort: any = {};

    sort[params.filter[filterMatch - 1]] =
      params.filter[filterMatch] === "asc" ? 1 : -1;

    filter[params.filter[findIndex]] = params.filter[findIndex + 1];

    const languageSkillContent = await LanguageSKillContent.aggregate([
      {
        $match: obj,
      },

      {
        $match: params.filter[findIndex] === undefined ? {} : filter,
      },
      {
        $sort:
          Object.keys(sort)[0] === "undefined"
            ? { uniqueNumberByCategory: 1 }
            : sort,
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

    // console.log(languageSkillContent.map((item) => item.data));

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
