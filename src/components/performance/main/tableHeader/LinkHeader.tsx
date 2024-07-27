import Link from "next/link";

import { transformLink } from "./LinkAction";

export default function LinkHeader({
  children,
  headers,
  params,
}: {
  children: React.ReactNode;
  headers: any;
  params: any;
}) {
  const pathname = transformLink(headers, params);

  return (
    <Link
      href={`/performance/${params.category}/${
        params?.filter === undefined
          ? headers.orderBy.asc
          : headers.orderName ===
              params?.filter[params?.filter?.indexOf(headers.orderName)] &&
            params?.filter.includes("asc")
          ? headers.orderBy.desc
          : headers.orderBy.asc
      }`}
    >
      {children}
    </Link>
  );
}
