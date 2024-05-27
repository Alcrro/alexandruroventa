import { navbarMenu } from "../../../../_lib/navbar/menu";

export async function GET() {
  try {
    return Response.json(navbarMenu);
  } catch (error) {
    console.log(error);
  }
}
