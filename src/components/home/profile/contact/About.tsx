import React from "react";
import "./about.scss";
import Link from "next/link";
import Social from "../social/Social";

export default function About() {
  return (
    <div className="about-container">
      <div className="contacts-container">
        <div className="contact-container">
          <div className="contact-inner">
            <Link href={"/contact/me"}>
              <span>Contact me</span>
            </Link>
          </div>
        </div>
        <div className="cv-container">
          <div className="cv-inner">
            <Link
              href={`https://alexandru-roventa.s3.eu-central-1.amazonaws.com/CV-Alexandru-Roventa-web-developer.pdf`}
              rel="noopener noreferrer"
              target="_blank"
              className="li-cv"
            >
              <span>Open my CV</span>
            </Link>
            <Link
              href={"/assets/cv/CV-Alexandru-Roventa-web-developer.pdf"}
              download
              target="_blank"
              className="btn cv-download-button"
            ></Link>
          </div>
        </div>
        <Social />
      </div>
    </div>
  );
}
