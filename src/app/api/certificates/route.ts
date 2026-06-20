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
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const documentsPerPage = Math.max(1, Number(searchParams.get("documentsPerPage")) || 12);

    const match: Record<string, unknown> = {};
    if (org) match.organization = { $regex: org, $options: "i" };
    if (lang) match.languageLearnt = { $regex: lang, $options: "i" };

    const [data, totalDocuments, orgs, langs] = await Promise.all([
      Certificates.find(match)
        .sort({ date: order })
        .skip((page - 1) * documentsPerPage)
        .limit(documentsPerPage)
        .lean(),
      Certificates.countDocuments(match),
      Certificates.distinct("organization"),
      Certificates.distinct("languageLearnt"),
    ]);

    return NextResponse.json(
      {
        data,
        totalDocuments,
        page,
        documentsPerPage,
        orgs: (orgs as string[]).filter(Boolean).sort(),
        langs: (langs as string[]).filter(Boolean).sort(),
      },
      { status: 200 }
    );
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
