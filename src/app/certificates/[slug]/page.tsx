import { getCertificateBySlug } from "@/_lib/certificates/getCertificate";
import Image from "next/image";
import React from "react";

export default async function page({ params }: { params: { slug: string } }) {
  console.log(params.slug);

  // console.log(params.slug);
  const certificate = await getCertificateBySlug(params.slug);
  let slug = certificate.certificates
    .map((item: any) => item.doc)
    .flat(1)
    .map((item: any) => item.src)
    .join("");

  console.log(slug);
  return (
    <div className="">
      <Image
        src={slug}
        alt="certificate"
        width={1200}
        height={1000}
        className="mx-auto rounded-md"
        priority
      />
    </div>
  );
}
