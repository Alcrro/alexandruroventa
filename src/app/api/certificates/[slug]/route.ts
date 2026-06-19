import { connectDB } from "@/config/mongoDB";
import Certificates from "@/models/certificates/Certificates";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const certificate = await Certificates.findOne({ slug: params.slug }).lean();
    if (!certificate) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, certificate }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
