"use client";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  orgs: string[];
  langs: string[];
  totalDocuments: number;
}

export default function CertificatesFilter({ orgs, langs, totalDocuments }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentOrg = searchParams.get("org");
  const currentLang = searchParams.get("lang");
  const currentOrder = searchParams.get("order") ?? "desc";

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`/certificates?${params.toString()}`);
  }

  return (
    <div className="certs-filters">
      {orgs.length > 1 && (
        <div className="certs-filter-row">
          <span className="certs-filter-label">Platform</span>
          <div className="certs-filter-pills">
            <button
              className={`filter-pill${!currentOrg ? " active" : ""}`}
              onClick={() => setParam("org", null)}
            >
              All
            </button>
            {orgs.map((org) => (
              <button
                key={org}
                className={`filter-pill${currentOrg === org ? " active" : ""}`}
                onClick={() => setParam("org", currentOrg === org ? null : org)}
              >
                {org}
              </button>
            ))}
          </div>
        </div>
      )}

      {langs.length > 1 && (
        <div className="certs-filter-row">
          <span className="certs-filter-label">Topic</span>
          <div className="certs-filter-pills">
            <button
              className={`filter-pill${!currentLang ? " active" : ""}`}
              onClick={() => setParam("lang", null)}
            >
              All
            </button>
            {langs.map((lang) => (
              <button
                key={lang}
                className={`filter-pill${currentLang === lang ? " active" : ""}`}
                onClick={() => setParam("lang", currentLang === lang ? null : lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="certs-filter-row certs-filter-row--right">
        <button
          className="sort-btn"
          onClick={() => setParam("order", currentOrder === "desc" ? "asc" : "desc")}
        >
          <i className={`bi bi-sort-${currentOrder === "desc" ? "down" : "up"}`} />
          {currentOrder === "desc" ? "Newest first" : "Oldest first"}
        </button>
        <span className="certs-count">{totalDocuments} certificates</span>
      </div>
    </div>
  );
}
