"use client";
import { useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import sendEmail from "@/_lib/send";
import "./contact.scss";

const BUSINESS_EMAIL = "business@alexandru-roventa.ro";

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

export default function ContactForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const copyEmail = () => {
    navigator.clipboard.writeText(BUSINESS_EMAIL);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // honeypot — bots fill hidden fields
    if (formData.get("website")) return;

    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (message.trim().length < 10) {
      toast.error("Message must be at least 10 characters.");
      return;
    }

    startTransition(async () => {
      const result = await sendEmail({ email, message });

      if (result?.error) {
        toast.error("Failed to send. Please try again.");
      } else {
        toast.success("Message sent successfully!");
        ref.current?.reset();
      }
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-inner">
        {/* Left — info */}
        <div className="contact-info">
          <h1 className="contact-title">Get in touch</h1>
          <p className="contact-subtitle">
            Have a project in mind or just want to say hello? Feel free to
            reach out — I&apos;ll get back to you as soon as possible.
          </p>

          <div className="contact-email-label">Email</div>
          <button
            type="button"
            className={`contact-email-btn${isCopied ? " is-copied" : ""}`}
            onClick={copyEmail}
            aria-label="Copy email address"
          >
            <span>{BUSINESS_EMAIL}</span>
            <i className={`bi ${isCopied ? "bi-check2" : "bi-clipboard"}`} />
          </button>

          <div className="contact-social">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="contact-social-link"
              >
                <i className={`bi ${link.icon}`} />
              </Link>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form
          ref={ref}
          onSubmit={handleSubmit}
          className="contact-form"
          noValidate
        >
          {/* honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            aria-hidden="true"
            className="contact-honeypot"
          />

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell me about your project..."
              required
              rows={7}
              className="form-textarea"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="contact-submit"
          >
            {isPending ? (
              <>
                <i className="bi bi-arrow-repeat contact-spinner" />
                Sending…
              </>
            ) : (
              <>
                <i className="bi bi-send" />
                Send message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
