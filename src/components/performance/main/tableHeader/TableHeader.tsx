import React, { useEffect, useState } from "react";
import "./tableHeader.scss";
import Link from "next/link";
import LinkHeader from "./LinkHeader";

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
      <LinkHeader headers={headers} params={params}>
        <div>{headers.name}</div>
        <div className="sort">
          <span
            className={`asc${
              params?.filter === undefined
                ? ""
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
      </LinkHeader>
    </li>
  );
}
