import { connectDB } from "@/config/mongoDB";
import Projects from "@/models/projects/Projects";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET() {
  try {
    const projects = await Projects.find().lean();
    return NextResponse.json({ success: true, projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, link, thumbnailPhoto, languagesUsed, gitRepository, hosted, moreDescription } = body;

    const project = await new Projects({
      title, link, thumbnailPhoto, languagesUsed, gitRepository, hosted, moreDescription,
    }).save();

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
