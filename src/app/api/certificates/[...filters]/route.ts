import { connectDB } from "@/config/mongoDB";
import Certificates from "@/models/certificates/Certificates";
import { NextRequest, NextResponse } from "next/server";
connectDB();
export async function GET(
  req: NextRequest,
  { params, searchParams }: { params: any; searchParams: string }
) {
  try {
    const { searchParams } = new URL(req.url);
    const searchParam = searchParams.get("search");
    const pageNumber = searchParams.get("page");
    let page: number = Number(pageNumber) || 1;
    let docPerPage = 12;
    let skip = docPerPage * (page - 1);
    let limit = docPerPage;

    let orderedBy = params.filters[0]?.split(",");
    let objN: any = {};
    objN[orderedBy[0]] = params.filters[1] === "asc" ? 1 : -1;

    if (params.filters[0] === "undefined" && searchParam === null) {
      const certificates = await Certificates.aggregate([
        {
          $facet: {
            data: [{ $skip: skip }, { $limit: limit }],
            dataInfo: [{ $group: { _id: null, count: { $sum: 1 } } }],
          },
        },
        {
          $project: {
            _id: 0,
            doc: "$data",
            totalDocuments: { $first: "$dataInfo.count" },
            page: `${page}`,
          },
        },
        {
          $sort: {
            organization: 1,
          },
        },
      ]);

      return NextResponse.json({
        success: true,
        message: "Certificates Loaded Successfully",
        certificates,
      });
    } else {
      const certificates = await Certificates.aggregate(
        searchParam !== null
          ? [
              {
                $search: {
                  index: "search",
                  text: {
                    query: "2022-02-02T21:00:00.000+00:00",
                    path: { wildcard: "*" },
                  },
                },
              },
              {
                $sort: objN,
              },
            ]
          : [
              {
                $sort: objN,
              },
            ]
      );
      return NextResponse.json({
        success: true,
        message: "Certificates Loaded Successfully",
        certificates,
      });
    }
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
