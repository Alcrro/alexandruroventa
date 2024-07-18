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

    filter[params.filter[findIndex]] = params.filter[findIndex + 1];

    let totalDocumentsCollection =
      await LanguageSKillContent.collection.countDocuments();

    console.log(totalDocumentsCollection);

    const languageSkillContent = await LanguageSKillContent.aggregate([
      {
        $match: obj,
      },

      {
        $match: params.filter[findIndex] === undefined ? {} : filter,
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
          documentsPerPage:`${limit}`
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
  { params }: { params: { slug: string } }
) {
  try {
    const reqBody = await req.json();
    const {
      contentDescription,
      category,
      languageType,
      contentTitle,
      code,
      versionCode,
    } = reqBody;

    const languageVersionCode = new CodeVersion({
      code,
      versionCode,
    });

    const languageVersionCodeSaved = await languageVersionCode.save();

    const newLanguageSkillContent = new LanguageSKillContent({
      contentDescription,
      category,
      contentTitle,
      languageType,
      versionCode_id: languageVersionCode._id,
    });
    const languageSkillContentSaved = await newLanguageSkillContent.save();

    return NextResponse.json({
      success: true,
      message: "Language skill created successfully",
      languageSkillContentSaved,
      languageVersionCodeSaved,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.errors }, { status: 500 });
  }
}
