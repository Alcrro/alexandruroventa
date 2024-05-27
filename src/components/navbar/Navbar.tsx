import React from "react";
import "./navbar.scss";

import NavbarMenu from "./menu/NavbarMenu";

export default async function Navbar() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/navbar/menu`, {
    headers: {
      "Content-Type": "application/json",
    },
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
