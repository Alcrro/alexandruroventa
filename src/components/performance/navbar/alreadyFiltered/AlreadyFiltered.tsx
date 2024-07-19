import React from "react";

export default function AlreadyFiltered({ params }: { params: any }) {
  let filteredBy = params.filter.slice(
    params.filter.indexOf(params.filter[1]),
    -1
  );
  console.log(params.filter);
  console.log(filteredBy);
  console.log(params.filter.indexOf(params.filter[1]));

  return (
    <div className="flex">
      <span>Already Filtered by:</span> <div>{params.filter[0]}</div>
    </div>
  );
}
