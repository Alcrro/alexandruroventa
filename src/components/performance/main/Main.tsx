import React from "react";
import "./contentList.scss";
import { iPerformanceDocument } from "@/types";
import Link from "next/link";
import Pagination from "@/components/pagination/Pagination";

export default function Main({
  documents,
  params,
}: {
  documents: iPerformanceDocument[];
  params: any;
}) {
  return (
    <div className="main-content-container">
      <div className="main-content-inner">
        <ul className="header-ul">
          <li>NrCrt</li>
          <li>Type</li>
          <li>Title</li>
          <li>Description</li>
          <li>version</li>
          <li>date</li>
        </ul>
        <ul className="body-ul">
          {documents
            .map((item:any) => item.data)
            .flat(1)
            .map((item: iPerformanceDocument, rowIndex: number) => (
              <li key={rowIndex} className="flex">
                <Link href={`/performance/${params.category}/${item.slug}`}>
                  <div>#{rowIndex + 1}</div>
                  <div>{item.languageType}</div>
                  <div>{item.contentTitle}</div>
                  <div>{item.contentDescription}</div>
                  <div> {item.codeversions_details.codVersion}</div>

                  <div>
                    {new Date(
                      item?.codeversions_details.dateVersion
                    )?.toLocaleDateString()}
                  </div>
                </Link>
              </li>
            ))}
        </ul>
        <Pagination
          totalProducts={documents[0]?.totalDocuments}
          currentPage={documents[0]?.page}
          documentsPerPage={documents[0]?.documentsPerPage}
        />
      </div>
    </div>
  );
}
