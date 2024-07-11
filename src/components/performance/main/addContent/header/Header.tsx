import React from "react";
import "./header.scss";
import InputLabels from "./labels/InputLabels";
import VersionAndDate from "./versionAndDate/VersionAndDate";
export default function Header() {
  return (
    <div className="add-content-header-container">
      <div className="add-content-header">
        <InputLabels />
        <VersionAndDate />
      </div>
    </div>
  );
}
