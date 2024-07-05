import React from "react";
import "./header.scss";
export default function Header() {
  return (
    <div className="add-content-header-container">
      <div className="add-content-header">
        <div className="title">
          <label htmlFor="" className="block">
            Add title to the content
          </label>
          <input
            type="text"
            placeholder="Please add title name to the content"
          />
        </div>
        <div className="description">
          <label htmlFor="" className="block">
            Add description to the content
          </label>
          <input
            type="text"
            placeholder="Please add description to the content"
          />
        </div>
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
      </div>
    </div>
  );
}
