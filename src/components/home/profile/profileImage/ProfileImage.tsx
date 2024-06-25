"use client";
import Image from "next/image";
import React from "react";
import "./profile.scss";
import ProfileDescription from "../../ProfileDescription";
export default function ProfileImage() {
  return (
    <div className="profile-container">
      <div className="profile-image-container">
        <Image
          src={"https://alexandru-roventa.s3.eu-central-1.amazonaws.com/eu.png"}
          alt="my-image"
          width={500}
          height={500}
          priority
          className="profile-image"
        />
      </div>
      <ProfileDescription />
    </div>
  );
}
