import { getCertificates } from "@/_lib/certificates/getCertificates";
import CertificatesGrid from "./CertificatesGrid";
import "./certificates.scss";

export default async function CertificatesPage() {
  const certs = await getCertificates();

  return (
    <section className="certs-section">
      <h1 className="certs-title">Certificates</h1>
      <CertificatesGrid certs={certs} />
    </section>
  );
}
