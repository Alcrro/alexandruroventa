import React from "react";
import "./addExperienceModal.scss";
import AddExperience from "../AddExperience";

export default async function AddExperienceModal() {
  return (
    <div className="add-experience-modal-container">
      <div className="add-experience-modal-inner">
        <div className="add-experience-modal-content">
          <AddExperience />
        </div>
      </div>
    </div>
  );
}
