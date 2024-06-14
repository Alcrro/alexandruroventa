import { skills } from "@/_lib/skills/skills";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(skills);
  } catch (error) {
    console.log(error);
  }
}
