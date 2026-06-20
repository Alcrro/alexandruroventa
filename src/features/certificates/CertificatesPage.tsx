import { Suspense } from "react";
import { getCertificates } from "@/_lib/certificates/getCertificates";
import CertificatesFilter from "./CertificatesFilter";
import CertificatesGrid from "./CertificatesGrid";
import "./certificates.scss";

const PER_PAGE = 12;

interface Props {
  searchParams: {
    org?: string;
    lang?: string;
    order?: string;
    page?: string;
  };
}

export default async function CertificatesPage({ searchParams }: Props) {
  const { org, lang, order, page } = searchParams;
  const pageNum = Math.max(1, Number(page) || 1);
  const orderVal = order === "asc" ? "asc" : "desc";

  const result = await getCertificates({
    org,
    lang,
    order: orderVal,
    page: pageNum,
    documentsPerPage: PER_PAGE,
  });

  const totalPages = Math.ceil(result.totalDocuments / PER_PAGE);
  const filterKey = `${org ?? ""}-${lang ?? ""}-${orderVal}-${pageNum}`;

  return (
    <section className="certs-section">
      <h1 className="certs-title">Certificates</h1>
      <Suspense fallback={null}>
        <CertificatesFilter
          orgs={result.orgs}
          langs={result.langs}
          totalDocuments={result.totalDocuments}
        />
      </Suspense>
      <Suspense fallback={null}>
        <CertificatesGrid
          data={result.data}
          page={pageNum}
          totalPages={totalPages}
          filterKey={filterKey}
        />
      </Suspense>
    </section>
  );
}
