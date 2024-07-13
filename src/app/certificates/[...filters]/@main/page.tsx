import getCertificates from "@/_lib/certificates/getCertificates";
import Main from "@/components/certificates/main/Main";
import React from "react";

export default async function page({ params }: { params: any }) {
  const main = await getCertificates(params);
  return (
    <>
  
      <Main documents={main?.certificates} />
    </>
  );
}
