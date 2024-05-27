import React, { useState } from "react";
import "./navbar.scss";
import NavbarMenu from "./menu/NavbarMenu";
import getNavbar from "@/_lib/navbar/getNavbar";

export default async function Navbar() {
  const data = await getNavbar();

  return (
    <nav className="nav navbar navbar-container">
      <div className="navbar-inner">
        <NavbarMenu data={data} />
      </div>
    </nav>
  );
}
