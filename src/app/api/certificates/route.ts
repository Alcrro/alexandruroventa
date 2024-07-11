import { connectDB } from "@/config/mongoDB";
import Certificates from "@/models/certificates/Certificates";
import { NextRequest, NextResponse } from "next/server";
connectDB();
export async function GET(req: NextRequest) {
  try {
    const certificates = await Certificates.find();

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
