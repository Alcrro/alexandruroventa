import { getCertificateBySlug } from "@/_lib/certificates/getCertificate";
import Modal from "@/components/certificates/modal/Modal";
import Image from "next/image";
import React from "react";

// export const dynamic = "force-dynamic";

export default async function page({ params }: { params: { slug: string } }) {
  const certificate = await getCertificateBySlug(params.slug);

  let slug = certificate.certificates
    .map((item: any) => item.doc)
    .flat(1)
    .map((item: any) => item.src)
    .join("");

  return (
    <Modal className="certificates-modal">
      <Image
        src={slug}
        alt="certificate"
        width={1200}
        height={1000}
        className="mx-auto rounded-md"
      />
    </Modal>
  );
}
