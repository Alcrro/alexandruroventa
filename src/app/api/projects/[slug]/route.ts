import { connectDB } from "@/config/mongoDB";
import Projects from "@/models/projects/Projects";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const project = await Projects.findOne({ slug: params.slug }).lean();
    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, project }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
