import type { Metadata } from "next";
import ContactForm from "@/features/contact/ContactForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Alexandru Roventa — Contact",
  description: "Get in touch with Alexandru Roventa — Full Stack Developer.",
};

export default function ContactPage() {
  return <ContactForm />;
}
