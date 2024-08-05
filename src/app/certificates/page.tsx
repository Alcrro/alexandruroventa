import Main from "@/components/certificates/main/Main";
import Order from "@/components/certificates/order/Order";
import "./certificates.scss";
import Search from "@/components/certificates/filters/Search";
import { getCertificates } from "@/_lib/certificates/getCertificates";

export default async function page({
  params,
  searchParams,
}: {
  params: any;
  searchParams?: string;
}) {
  const main = await getCertificates(params, searchParams);

  return (
    <div className="certificates-container relative">
      <div className="filters-container">
        <Search />
        <Order />
      </div>
      <Main documents={main.certificates} />
    </div>
  );
}
