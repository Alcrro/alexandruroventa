import { connectDB } from "@/config/mongoDB";
import Projects from "@/models/projects/Projects";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function GET(req: NextRequest) {
  try {
    const projects = await Projects.find();

    return NextResponse.json(
      {
        success: true,
        message: "Projects loaded successfully",
        projects,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const {
      title,
      link,
      thumbnailPhoto,
      languagesUsed,
      gitRepository,
      hosted,
      moreDescription,
    } = reqBody;

    const project = new Projects({
      title,
      link,
      thumbnailPhoto,
      languagesUsed,
      gitRepository,
      hosted,
      moreDescription,
    });

    const projectSaved = await project.save();

    return NextResponse.json({
      success: true,
      message: "Projects saved successfully",
      projectSaved,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
