import React from "react";
import "./navbar.scss";

import NavbarMenu from "./menu/NavbarMenu";

export default async function Navbar() {
  const response = await fetch("http://localhost:3000/api/navbar/menu", {
    cache: "force-cache",
  });
  const data = await response.json();

  return (
    <nav className="nav navbar navbar-container">
      <div className="navbar-inner">
        <NavbarMenu data={data} />
      </div>
    </nav>
  );
}
