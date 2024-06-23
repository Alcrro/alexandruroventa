import React from "react";
import "./addExperienceModal.scss";
import Link from "next/link";
import AddContentForm from "./AddTextContent/AddContentForm";

export default async function AddExperienceModal() {
  const dateObj = new Date();
  // get the month in this format of 04, the same for months
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);
  const year = dateObj.getFullYear();

  const shortDate = `${year}-${month}-${day}`;

  return (
    <div className="add-experience-modal-container">
      <div className="add-experience-modal-inner">
        <div className="add-experience-modal-content">
          <div className="header">
            <div className="title">Add your experience</div>
            <Link href={"/experience"} className="close-button"></Link>
          </div>
          <AddContentForm date={shortDate} />
        </div>
      </div>
    </div>
  );
}
