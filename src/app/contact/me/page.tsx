export const dynamic = "force-dynamic";
import ContactForm from "@/features/contact/ContactForm";
import ContactModal from "@/features/contact/ContactModal";

export default function ContactMePage() {
  return (
    <ContactModal>
      <ContactForm />
    </ContactModal>
  );
}
