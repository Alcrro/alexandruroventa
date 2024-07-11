import React from "react";

export default function VersionAndDate() {
  return (
    <>
      <div className="version-and-data">
        <div className="version">
          <label htmlFor="" className="block">
            Version of content
          </label>
          <input type="text" placeholder="1.2" disabled />
        </div>
        <div className="data">
          <label htmlFor="" className="block">
            Created at
          </label>
          <input type="text" placeholder="04/02/2024" disabled />
        </div>
      </div>
    </>
  );
}
