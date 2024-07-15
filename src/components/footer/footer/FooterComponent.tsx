import Link from 'next/link'
import React from 'react'

export default function FooterComponent() {
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
            <Link href={"https://alexandru-roventa.ro/"} target="_blank">
              alexandru-roventa.ro
            </Link>
          </div>
          <div>
            <Link href={"https://lucruri-utile.ro"} target="_blank">
              lucruri-utile.ro
            </Link>
          </div>
          <div>
            <Link href={"https://alcrro.ro"} target="_blank">
              alcrro.ro
            </Link>
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
  )
}
