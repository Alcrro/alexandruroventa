import React from "react";
import LinkPagination from "./LinkPagination";
import "./paginationContainer.scss";
export default function Pagination({
  totalProducts,
  currentPage,
}: {
  totalProducts: any;
  currentPage: any;
}) {
  let totProducts: number = Number(totalProducts);
  let pages = Math.ceil(totProducts / 12);


  let numberPages = [];

  for (let i = 1; i <= pages; i++) {
    numberPages.push(i);
  }


  return (
    <div className="pagination-container">
      <div className="pagination">
        <ul className="ul-pagination">
          {numberPages.map((item, key) => (
            <LinkPagination key={key} item={item} currentPage={currentPage} />
          ))}
        </ul>
      </div>
    </div>
  );
}
