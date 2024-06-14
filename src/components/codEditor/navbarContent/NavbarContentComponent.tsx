import Link from "next/link";
import React from "react";
import "./navbarContent.scss";
export default function NavbarContentComponent() {
  return (
    <div className="navbar-content-inner">
      <div className="previous-button-container">
        <Link href="">
          <span className="icon-previous"></span>
        </Link>
      </div>
      <div className="next-button-container">
        <Link href="">
          <span className="icon-next"></span>
        </Link>
      </div>
    </div>
  );
}
