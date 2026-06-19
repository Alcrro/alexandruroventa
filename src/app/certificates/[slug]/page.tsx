import Image from "next/image";
import { notFound } from "next/navigation";
import { getCertificateBySlug } from "@/_lib/certificates/getCertificate";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cert = await getCertificateBySlug(params.slug);
  if (!cert) return { title: "Certificate — Alexandru Roventa" };
  return {
    title: `${cert.languageLearnt} — ${cert.organization} · Alexandru Roventa`,
  };
}

export default async function CertificatePage({ params }: { params: { slug: string } }) {
  const cert = await getCertificateBySlug(params.slug);
  if (!cert) notFound();

  return (
    <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "3rem 1rem" }}>
      <Image
        src={cert.src}
        alt={`${cert.organization} — ${cert.languageLearnt}`}
        width={1200}
        height={900}
        style={{ width: "100%", height: "auto", borderRadius: "12px" }}
        priority
      />
    </div>
  );
}
