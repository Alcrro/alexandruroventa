import { connectDB } from "@/config/mongoDB";
import Certificates from "@/models/certificates/Certificates";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const org = searchParams.get("org");
    const lang = searchParams.get("lang");
    const order = searchParams.get("order") === "asc" ? 1 : -1;

    const match: any = {};
    if (org) match.organization = { $regex: org, $options: "i" };
    if (lang) match.languageLearnt = { $regex: lang, $options: "i" };

    const certificates = await Certificates.find(match)
      .sort({ date: order })
      .lean();

    return NextResponse.json({ success: true, certificates }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organization, languageLearnt, src, author, date } = await req.json();
    const certificate = await new Certificates({ organization, languageLearnt, src, author, date }).save();
    return NextResponse.json({ success: true, certificate }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
