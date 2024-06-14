import { knowledgeData } from "@/_lib/knwoledge/knowledgeData";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { contentID: string } }
) {
  try {
    const contentID =
      params.contentID.split("-")[params.contentID.split("-").length - 1];
    const filter = knowledgeData.filter(
      (filter: any) => filter.contentId === contentID
    );
    return Response.json(filter);
  } catch (error) {
    console.log(error);
  }
}
