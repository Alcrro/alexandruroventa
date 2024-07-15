import getCertificates from "@/_lib/certificates/getCertificates";
import Main from "@/components/certificates/main/Main";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const main = await getCertificates(params, searchParams);

  return (
    <>
      <Main documents={main.certificatesDocuments} />
    </>
  );
}
