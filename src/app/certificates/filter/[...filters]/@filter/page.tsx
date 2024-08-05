
import { getCertificates } from "@/_lib/certificates/getCertificates";
import Search from "@/components/certificates/filters/Search";
import Order from "@/components/certificates/order/Order";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: string;
  searchParams: string;
}) {
  await getCertificates(params, searchParams);

  return (
    <div className="filters-container ">
      <Search />
      <Order />
    </div>
  );
}
