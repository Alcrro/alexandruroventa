import Image from "next/image";
import { notFound } from "next/navigation";
import { getCertificateBySlug } from "@/_lib/certificates/getCertificate";
import CertificateModal from "@/features/certificates/CertificateModal";

export const dynamic = "force-dynamic";

export default async function CertificateModalPage({ params }: { params: { slug: string } }) {
  const cert = await getCertificateBySlug(params.slug);
  if (!cert) notFound();

  return (
    <CertificateModal>
      <Image
        src={cert.src}
        alt={`${cert.organization} — ${cert.languageLearnt}`}
        width={1200}
        height={900}
        style={{ width: "100%", height: "auto", display: "block" }}
        priority
      />
    </CertificateModal>
  );
}
