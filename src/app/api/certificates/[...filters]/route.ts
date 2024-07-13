import { connectDB } from "@/config/mongoDB";
import Certificates from "@/models/certificates/Certificates";
import { NextRequest, NextResponse } from "next/server";
connectDB();
export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    console.log(params.filters[0] === "undefined");

    let orderedBy = params.filters[0]?.split(",");
    let objN: any = {};
    objN[orderedBy[0]] = params.filters[1] === "asc" ? 1 : -1;

    if (params.filters[0] === "undefined") {
      const certificates = await Certificates.aggregate([
        {
          $sort: {
            organization: 1,
          },
        },
      ]);
      // console.log(certificates);

      return NextResponse.json({
        success: true,
        message: "Certificates Loaded Successfully",
        certificates,
      });
    } else {
      const certificates = await Certificates.aggregate([
        {
          $sort: objN,
        },
      ]);
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
