import Link from "next/link";
import React from "react";
import "./social.scss";

export default function Social() {
  return (
    <div className="social-container">
      <Link href={"https://www.linkedin.com/in/alexandru-roventa/"} className="li-social">
        <span className="image-linkedin"></span>
      </Link>
    </div>
  );
}
