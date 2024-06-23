import React from "react";
import "./addTextContent.scss";
export default function AddTextContent() {
  return (
    <div className="add-text-content-container">
      <div className="add-text-content-inner">
        <div className="area-text">
          <textarea
            name="textContent"
            id=""
            rows={10}
            placeholder="Add your job history here..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
