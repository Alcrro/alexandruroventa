import React from "react";
import "./contentList.scss";
import Link from "next/link";

export default function Main({ documents }: { documents: string[] }) {
  let isNotIncluded = ["_id", "category", "__v", "slug"];

  let isFiltered = Object.keys(documents[0]).filter(
    (filter) => !isNotIncluded.includes(filter)
  );

  let headerArray = ["type", "title", "description"];

  let test: any = [];

  let addElement = isFiltered.map((item) => test.push({ category: item }));
  headerArray.map((header, index) => test.push({ name: header }));
  console.log("gg", addElement);
  console.log("gg", test);

  let headers = Object.keys(documents[0]);
  // console.log(headers);

  return (
    <div className="main-content-container">
      <div className="main-content-inner">
        <ul className="header-ul">
          <li>Type</li>
          <li>Title</li>
          <li>Description</li>
          {/* <li>Data</li> */}
        </ul>
        <ul className="body-ul">
          {documents.map((item, rowIndex) => (
            <>
              <li key={rowIndex} className="">
                {isFiltered.map((header, colIndex) => (
                  <div className="content-group">
                    <div className="content-body-header">{header}:</div>
                    <div key={colIndex}>{item[header]}</div>
                  </div>
                ))}
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}
