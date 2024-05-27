import ContactForm from "../../../components/home/profile/contact/contactForm/ContactForm";
import ContactModal from "../../../components/home/profile/contact/contactModal/ContactModal";
import React from "react";

export default function page() {
  return (
    <ContactModal>
      <ContactForm />
    </ContactModal>
  );
}
