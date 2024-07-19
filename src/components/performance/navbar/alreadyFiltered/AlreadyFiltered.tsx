import React from "react";

export default function AlreadyFiltered({ params }: { params: any }) {
  return (
    <>
      {params.filter === undefined ? null : (
        <div className="flex">
          <span>Already Filtered by:</span>
          <div>{params.filter[0]}</div>
        </div>
      )}
    </>
  );
}
