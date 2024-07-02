import Link from "next/link";
import React from "react";
import AddContentForm from "./modal/AddTextContent/AddContentForm";
import DateCalc from "./modal/AddTextContent/DateCalc";
import "./addExperience.scss";
export default function AddExperience() {
  const shortDate = DateCalc();
  return (
    <div className="add-experience-container">
      <div className="header">
        <div className="title">Add your experience</div>
        <Link href={"/experience"} className="close-button"></Link>
      </div>
      <AddContentForm date={shortDate} />
    </div>
  );
}
