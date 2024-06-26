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
          <div className="projects">
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
          <div className="social-media">
            <Link
              href={"https://www.linkedin.com/in/alexandru-roventa/"}
              target="_blank"
              className="social-media-icon"
            ></Link>
          </div>
        </div>
        <div className="row text-center py-3">
          <div className="footer-copy">Copyright © 2003-2024 alcrro.ro</div>
        </div>
      </div>
    </div>
  );
}
