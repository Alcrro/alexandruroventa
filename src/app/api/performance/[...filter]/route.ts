import algorithmParamsAPI from "@/_lib/languageSkill/algorithmParamsAPI";
import { connectDB } from "@/config/mongoDB";
import CodeVersion from "@/models/languageSkill/LanguageSkillCodeVersion";
import LanguageSKillContent from "@/models/languageSkill/LanguageSkillContent";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(req: NextRequest, { params }: { params: any }) {
  const filter = algorithmParamsAPI(params.filter);
  console.log(filter?.obj.languageType);

  try {
    const languageSkillContent = await LanguageSKillContent.aggregate([
      {
        $match: {
          category: filter?.obj.category,
          languageType:
            filter?.obj.languageType === undefined
              ? null
              : "",
        },
      },

      {
        $lookup:
          /**
           * from: The target collection.
           * localField: The local join field.
           * foreignField: The target join field.
           * as: The name for the results.
           * pipeline: Optional pipeline to run on the foreign collection.
           * let: Optional variables to use in the pipeline field stages.
           */
          {
            from: "codeversions",
            localField: "versionCode_id",
            foreignField: "_id",
            as: "codVersion_details",
          },
      },
      {
        $addFields: {
          codVersion_details: {
            $arrayElemAt: ["$codVersion_details", 0],
          },
        },
      },
      {
        $addFields: {
          codVersion: "$codVersion_details.versionCode",
          dateVersion: "$codVersion_details.date",
        },
      },
      {
        $project: {
          languageType: 1,
          contentTitle: 1,
          contentDescription: 1,
          codVersion: 1,
          dateVersion: 1,
        },
      },
    ]);

    console.log(languageSkillContent);

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
