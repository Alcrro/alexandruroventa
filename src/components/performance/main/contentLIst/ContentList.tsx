import Link from "next/link";
import React from "react";
import "./contentList.scss";

export default function ContentList({ document }: { document: any }) {
  return (
    <li className="content-li">
      <Link href={`/performance/${document.category}/${document.slug}`}>
        <div className="content-type">
          <div className="title"> Type</div>
          <div className="content">{document.languageType}</div>
        </div>
        <div className="content-title">
          <div className="title">Title</div>
          <div className="content">{document.contentTitle}</div>
        </div>
        <div className="content-description">
          <div className="title">Description</div>
          <div className="content">{document.contentDescription}</div>
        </div>
        <div className="content-version">
          <div className="title">Version</div>
          <div className="content">{document.contentDescription}</div>
        </div>
      </Link>
    </li>
  );
}
