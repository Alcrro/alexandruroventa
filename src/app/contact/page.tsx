export const dynamic = "force-dynamic";
import { Metadata } from "next/types";
import ContactForm from "../../components/home/profile/contact/contactForm/ContactForm";
import React from "react";
export const metadata: Metadata = {
  title: "Alexandru Roventa - Contact me",
  description: "Home",
};
export default function page() {
  return (
    <div className="">
      <ContactForm />
    </div>
  );
}
