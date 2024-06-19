import React from "react";
import "./footer.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-inner">
        <div className="row">
          <div className="contact">
            <div className="title">CONTACT</div>
            <div>business@alexandru-roventa.ro</div>
            <div>alex.roventa94@gmail.com</div>
          </div>
          <div className="contact">
            <div className="title">PROJECTS</div>
            <div>
              <Link href={"https://www.alexandru-roventa.ro/"}>
                alexandru-roventa.ro
              </Link>
            </div>
            <div>
              <Link href={"https://lucruri-utile.ro"}>lucruri-utile.ro</Link>
            </div>
            <div>
              <Link href={"https://alcrro.ro"}>alcrro.ro</Link>
            </div>
          </div>
          <div className="footer-copy"></div>
        </div>
      </div>
    </div>
  );
}
