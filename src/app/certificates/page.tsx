import type { Metadata } from "next";
import CertificatesPage from "@/features/certificates/CertificatesPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Alexandru Roventa — Certificates",
  description: "Professional certificates in web development, React, TypeScript and more.",
};

interface Props {
  searchParams: {
    org?: string;
    lang?: string;
    order?: string;
    page?: string;
  };
}

export default function CertificatesRoute({ searchParams }: Props) {
  return <CertificatesPage searchParams={searchParams} />;
}
