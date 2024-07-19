import React, { useEffect, useState } from "react";
import "./tableHeader.scss";
import Link from "next/link";

interface headers {
  id: number;
  name: string;
  orderName: string;
  orderBy: {
    asc: string;
    desc: string;
  };
}
export default function TableHeader({
  headers,
  params,
}: {
  headers: headers;
  params: { category: string; filter: string[] };
}) {
  return (
    <li
      className={`${
        params?.filter === undefined
          ? ""
          : headers.orderName ===
            params?.filter[params?.filter?.indexOf(headers.orderName)]
          ? " active"
          : ""
      }`}
    >
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
        <div>{headers.name}</div>
        <div className="sort">
          <span
            className={`asc${
              params?.filter === undefined
                ? null
                : headers.orderName ===
                    params?.filter[
                      params?.filter?.indexOf(headers.orderName)
                    ] && params?.filter.includes("asc")
                ? " active"
                : ""
            }`}
          ></span>
          <span
            className={`desc${
              params?.filter === undefined
                ? ""
                : headers.orderName ===
                    params?.filter[
                      params?.filter?.indexOf(headers.orderName)
                    ] && params?.filter.includes("desc")
                ? " active"
                : ""
            }`}
          ></span>
        </div>
      </Link>
    </li>
  );
}
