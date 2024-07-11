import getCertificates from "@/_lib/certificates/getCertificates";
import Filters from "@/components/certificates/filters/Filters";
import Main from "@/components/certificates/main/Main";
import Order from "@/components/certificates/order/Order";
import "./certificates.scss";

export default async function page() {
  const main = await getCertificates();
  return (
    <>
      <div className="filters-container">
        <Filters />
        <Order />
      </div>
      <Main documents={main.certificates} />
    </>
  );
}
