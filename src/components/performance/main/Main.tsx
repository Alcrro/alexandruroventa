import React from "react";
import ContentWrapper from "./modal/module/ContentWrapper";
import Link from "next/link";
import ContentLink from "../content/ContentLink";

export default function Main({ documents }: { documents: any }) {
  console.log("documents", documents);

  return (
    <div className="main-content">
      {documents.map((document: any, key: any) => (
        <li key={key}>
          <Link href={`/performance/${document.category}/${document.slug}`}>
            {document.category}
          </Link>
        </li>
      ))}
    </div>
  );
}
