import type { Metadata } from "next";
import CertificatesPage from "@/features/certificates/CertificatesPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Alexandru Roventa — Certificates",
  description: "Professional certificates in web development, React, TypeScript and more.",
};

export default function CertificatesRoute() {
  return <CertificatesPage />;
}
