import { NextRequest } from "next/server";

export function pagination(
  req: NextRequest,
  params: { filter: string[] | any }
) {
  const { searchParams } = new URL(req.url);
  const pageNumber = searchParams.get("page");

  let page: number = Number(pageNumber) || 1;

  let docPerPage = 20;
  let skip = docPerPage * (page - 1);

  let limit =
    params.filter.indexOf("limit") === -1
      ? 20
      : Number(
          params.filter[params.filter.indexOf("limit") + 1]
            .match(/\d+/g)
            .toString()
        );

  return {
    skip,
    limit,
    page,
  };
}
