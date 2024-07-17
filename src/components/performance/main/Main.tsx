import React from "react";
import "./contentList.scss";
import { iPerformanceDocument } from "@/types";
import Link from "next/link";

export default function Main({
  documents,
  params,
}: {
  documents: iPerformanceDocument[];
  params: any;
}) {
  console.log(params);

  return (
    <div className="main-content-container">
      <div className="main-content-inner">
        <ul className="header-ul">
          <li>Type</li>
          <li>Title</li>
          <li>Description</li>
          <li>version</li>
          <li>date</li>
        </ul>
        <ul className="body-ul">
          {documents?.map((item: iPerformanceDocument, rowIndex: number) => (
            <li key={rowIndex} className="flex">
              <Link href={`/performance/${params.category}/${item.slug}`}>
                <div>{item.languageType}</div>
                <div>{item.contentTitle}</div>
                <div>{item.contentDescription}</div>
                <div> {item.codVersion}</div>

                <div>{new Date(item?.dateVersion)?.toLocaleDateString()}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
