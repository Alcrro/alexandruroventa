import React from "react";
import ContentWrapper from "./modal/modul/ContentWrapper";

export default function Main({ documents }: { documents: any }) {
  //   console.log("documents", documents);

  return (
    <div className="main-content">
      {documents.map((document: any, key: any) => (
        <li key={key}>{document.name}</li>
      ))}
    </div>
  );
}
