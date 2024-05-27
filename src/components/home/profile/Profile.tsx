import React from "react";
import ProfileImage from "./profileImage/ProfileImage";
import About from "./contact/About";
import Social from "./social/Social";
import Spacing from "../spacing/Spacing";

export default function Profile() {
  return (
    <div className="profile-container">
      <ProfileImage />
      <About />
      <Spacing />
    </div>
  );
}
