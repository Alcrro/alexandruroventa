import { experiences } from "@/_lib/experience/experience";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(experiences);
  } catch (error) {
    console.log(error);
  }
}
