import Link from "next/link";
import "./footer.scss";

const contactEmails = [
  "business@alexandru-roventa.ro",
  "alex.roventa94@gmail.com",
];

const projectLinks = [
  { label: "alexandru-roventa.ro", href: "https://alexandru-roventa.ro/" },
  { label: "lucruri-utile.ro", href: "https://lucruri-utile.ro" },
  { label: "alcrro.ro", href: "https://alcrro.ro" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alexandru-roventa/",
    icon: "bi-linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/Alcrro",
    icon: "bi-github",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <span className="footer-col-title">Contact</span>
          {contactEmails.map((email) => (
            <span key={email} className="footer-text">
              {email}
            </span>
          ))}
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Projects</span>
          {projectLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer-col footer-col--social">
          <span className="footer-col-title">Social</span>
          <div className="footer-social">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="footer-social-link"
              >
                <i className={`bi ${link.icon}`} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-copy">
        © 2023–{year} Alexandru Roventa. All rights reserved.
      </div>
    </footer>
  );
}
