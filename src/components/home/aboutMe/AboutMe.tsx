import React from "react";
import "./aboutMe.scss";
import AboutMeContent from "./AboutMeContent";

export default function AboutMe() {
  return (
    <div className="about-me-container">
      <div className="about-me-inner ">
        <AboutMeContent />
      </div>
    </div>
  );
}
