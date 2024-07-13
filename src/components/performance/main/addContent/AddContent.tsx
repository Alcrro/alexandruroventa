import React from "react";
import Header from "./header/Header";
import "./addContent.scss";
import headerAction from "./action/headerAction";
import ContentCode from "./contentCode/ContentCode";

export default function AddContent() {
  return (
    <div className="add-content-container">
      <div className="add-content">
        <form action={headerAction}>
          <Header />
          <ContentCode />
        </form>
      </div>
    </div>
  );
}
