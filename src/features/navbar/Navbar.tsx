import React from "react";
import NavbarMenu from "./NavbarMenu";

export default function Navbar() {
  return (
    <nav className="nav navbar navbar-container">
      <div className="navbar-inner">
        <NavbarMenu />
      </div>
    </nav>
  );
}
