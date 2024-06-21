import React from "react";
import "./addExperienceButton.scss";
import Link from "next/link";

export default function AddExperienceButton() {
  return (
    <div>
      <div className="add-experience-button">
        <Link
          href={`/experience/add-experience`}
          className="btn-add-experience-button"
        ></Link>
      </div>
    </div>
  );
}
