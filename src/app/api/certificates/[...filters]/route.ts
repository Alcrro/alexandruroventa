import { connectDB } from "@/config/mongoDB";
import Certificates from "@/models/certificates/Certificates";
import { NextRequest, NextResponse } from "next/server";
connectDB();

interface iSlug {
  slug: string;
}

export async function GET(
  req: NextRequest,
  { params, searchParams }: { params: any; searchParams: string }
) {
  try {
    console.log(params);
    const { searchParams } = new URL(req.url);
    const searchParam = searchParams.get("search");
    const pageNumber = searchParams.get("page");

    let slugObj: any = {};
    let page: number = Number(pageNumber) || 1;
    let docPerPage = 12;
    let skip = docPerPage * (page - 1);
    let limit = docPerPage;

    let orderedBy = params.filters[0]?.split(",");
    let objN: any = {};
    objN[orderedBy[0]] = params.filters[1] === "asc" ? 1 : -1;

    const findIndex = params.filters.findIndex(
      (findIndex: string) => findIndex === "slug"
    );

    slugObj[params.filters[findIndex]] = params.filters[findIndex + 1];
    console.log(slugObj);

    const certificates = await Certificates.aggregate([
      findIndex >= 0
        ? { $match: slugObj }
        : {
            $match: searchParam
              ? {
                  $or: [
                    { organization: { $regex: searchParam, $options: "i" } }, // Match text1
                    {
                      languageLearnt: { $regex: searchParam, $options: "i" },
                    }, // Match text2
                    { author: { $regex: searchParam, $options: "i" } }, // Match text3
                  ],
                }
              : {}, // Match all documents if searchValue is null
          },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit },

            {
              $sort:
                Object.keys(objN).toString() === "undefined"
                  ? { organization: 1 }
                  : objN,
            },
          ],
          dataInfo: [{ $group: { _id: null, count: { $sum: 1 } } }],
        },
      },
      {
        $project: {
          _id: 0,
          doc: "$data",
          totalDocuments: { $first: "$dataInfo.count" },
          documentsPerPage: `${limit}`,
          page: `${page}`,
        },
      },
    ]);

    console.log(certificates);

    return NextResponse.json({
      success: true,
      message: "Certificates Loaded Successfully",
      certificates,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const { organization, languageLearnt, src, author, date } = reqBody;

    const certificate = new Certificates({
      organization,
      languageLearnt,
      src,
      author,
      date,
    });

    const certificateSaved = await certificate.save();

    return NextResponse.json({
      success: true,
      message: "Certificates Loaded Successfully",
      certificateSaved,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
