import React from "react";

export default function Header() {
  return (
    <div className="content-header-container">
      <div className="content-header-inner flex justify-between items-center">
        <div>
          <h1 className="title text-3xl">Title</h1>
          <h3 className="description text-xl">Description</h3>
        </div>
        <div className="content-version flex flex-col justify-center text-center">
          <span className="">version: </span>
          <span className="text-gray-400 text-xs">1.2 | 20/02/2024 </span>
        </div>
      </div>
    </div>
  );
}
