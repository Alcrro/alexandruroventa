import React from "react";
import "./contentList.scss";
import { iPerformanceDocument } from "@/types";
import Link from "next/link";
import Pagination from "@/components/pagination/Pagination";
import TableHeader from "./tableHeader/TableHeader";
import { headerArray } from "@/_lib/languageSkill/headerArray";
import OrderBy from "./orderBy/OrderBy";
import dynamic from "next/dynamic";
import LinkTableContent from "./LinkTableContent";

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
          {headerArray.map((headers, key) => (
            <TableHeader headers={headers} params={params} key={key} />
          ))}
        </ul>
        <ul className="body-ul">
          {documents
            .map((item: any) => item.data)
            .flat(1)
            .map((item: iPerformanceDocument, rowIndex: number) => (
              <li key={rowIndex}>
                <LinkTableContent item={item}>
                  <OrderBy item={item} params={params} />
                </LinkTableContent>
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
