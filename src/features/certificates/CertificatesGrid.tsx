"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { iCertificate } from "@/types";
import CertificateCard from "./CertificateCard";

const PER_PAGE = 12;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function CertificatesGrid({ certs }: { certs: iCertificate[] }) {
  const [orgFilter, setOrgFilter] = useState<string | null>(null);
  const [langFilter, setLangFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<"desc" | "asc">("desc");
  const [page, setPage] = useState(1);

  const orgs = useMemo(
    () => Array.from(new Set(certs.map((c) => c.organization).filter(Boolean))).sort(),
    [certs]
  );
  const langs = useMemo(
    () => Array.from(new Set(certs.map((c) => c.languageLearnt).filter(Boolean))).sort(),
    [certs]
  );

  const filtered = useMemo(() => {
    const result = certs
      .filter((c) => !orgFilter || c.organization === orgFilter)
      .filter((c) => !langFilter || c.languageLearnt === langFilter)
      .sort((a, b) => {
        const ta = new Date(a.date).getTime();
        const tb = new Date(b.date).getTime();
        return sort === "desc" ? tb - ta : ta - tb;
      });
    return result;
  }, [certs, orgFilter, langFilter, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const resetPage = () => setPage(1);

  const filterKey = `${orgFilter}-${langFilter}-${sort}`;

  return (
    <div>
      {/* Filters */}
      <div className="certs-filters">
        {orgs.length > 1 && (
          <div className="certs-filter-row">
            <span className="certs-filter-label">Platform</span>
            <div className="certs-filter-pills">
              <button
                className={`filter-pill${orgFilter === null ? " active" : ""}`}
                onClick={() => { setOrgFilter(null); resetPage(); }}
              >
                All
              </button>
              {orgs.map((org) => (
                <button
                  key={org}
                  className={`filter-pill${orgFilter === org ? " active" : ""}`}
                  onClick={() => { setOrgFilter(orgFilter === org ? null : org); resetPage(); }}
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
                className={`filter-pill${langFilter === null ? " active" : ""}`}
                onClick={() => { setLangFilter(null); resetPage(); }}
              >
                All
              </button>
              {langs.map((lang) => (
                <button
                  key={lang}
                  className={`filter-pill${langFilter === lang ? " active" : ""}`}
                  onClick={() => { setLangFilter(langFilter === lang ? null : lang); resetPage(); }}
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
            onClick={() => { setSort((s) => (s === "desc" ? "asc" : "desc")); resetPage(); }}
          >
            <i className={`bi bi-sort-${sort === "desc" ? "down" : "up"}`} />
            {sort === "desc" ? "Newest first" : "Oldest first"}
          </button>
          <span className="certs-count">{filtered.length} certificates</span>
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filterKey}
          variants={container}
          initial="hidden"
          animate="visible"
          className="certs-grid"
        >
          {paginated.map((cert) => (
            <motion.div key={cert.slug} variants={card}>
              <CertificateCard cert={cert} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="certs-pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`page-btn${p === page ? " active" : ""}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
