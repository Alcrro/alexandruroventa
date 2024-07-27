import React from "react";
import "./alreadyFiltered.scss";
export default function AlreadyFiltered({
  params,
}: {
  params: { filter: string[] };
}) {
  let filtered: any = [];

  return (
    <>
      {params.filter === undefined ? null : (
        <div className="already-filtered-container">
          <div className="title-already-filtered-container">Filtered by:</div>
          <div className="flex"></div>
        </div>
      )}
    </>
  );
}
