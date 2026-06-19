"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import "./performance.scss";

interface Entry {
  _id: string;
  contentTitle: string;
  contentDescription: string;
  languageType: "course" | "project";
  uniqueNumberByCategory: number;
  slug: string;
  codeversions_details?: {
    codVersion: string;
    dateVersion: string;
  };
}

const PER_PAGE = 15;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const row = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export default function PerformanceList({
  entries,
  category,
}: {
  entries: Entry[];
  category: string;
}) {
  const [typeFilter, setTypeFilter] = useState<"all" | "course" | "project">("all");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = typeFilter === "all" ? entries : entries.filter((e) => e.languageType === typeFilter);
    list = [...list].sort((a, b) =>
      sortAsc
        ? a.uniqueNumberByCategory - b.uniqueNumberByCategory
        : b.uniqueNumberByCategory - a.uniqueNumberByCategory
    );
    return list;
  }, [entries, typeFilter, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const filterKey = `${typeFilter}-${sortAsc}`;

  function handleFilter(next: "all" | "course" | "project") {
    setTypeFilter(next);
    setPage(1);
  }

  return (
    <section className="perf-list-section">
      <div className="perf-list-header">
        <h1 className="perf-list-title">{category}</h1>
        <div className="perf-list-controls">
          <div className="perf-filter-pills">
            {(["all", "course", "project"] as const).map((t) => (
              <button
                key={t}
                className={`perf-pill${typeFilter === t ? " active" : ""}`}
                onClick={() => handleFilter(t)}
              >
                {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <button
            className="perf-sort-btn"
            onClick={() => { setSortAsc((p) => !p); setPage(1); }}
          >
            <i className={`bi bi-sort-${sortAsc ? "up" : "down"}`} />
            {sortAsc ? "Oldest first" : "Newest first"}
          </button>
        </div>
      </div>

      <p className="perf-count">{filtered.length} {filtered.length === 1 ? "entry" : "entries"}</p>

      {filtered.length === 0 ? (
        <div className="perf-empty">No entries found.</div>
      ) : (
        <>
          <div className="perf-table-head">
            <span>#</span>
            <span>Type</span>
            <span>Title</span>
            <span>Description</span>
            <span style={{ textAlign: "right" }}>Version</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filterKey}
              className="perf-table"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {visible.map((entry) => (
                <motion.div key={entry._id} variants={row}>
                  <Link
                    href={`/performance/${category}/${entry.slug}`}
                    className="perf-table-row"
                  >
                    <span className="perf-row-num">{entry.uniqueNumberByCategory}</span>
                    <span className={`perf-type-badge ${entry.languageType}`}>
                      {entry.languageType}
                    </span>
                    <span className="perf-row-title">{entry.contentTitle}</span>
                    <span className="perf-row-desc">{entry.contentDescription}</span>
                    <span className="perf-row-version">
                      {entry.codeversions_details?.codVersion ?? "—"}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="perf-pagination">
              <button
                className="perf-page-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
              >
                <i className="bi bi-chevron-left" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`perf-page-btn${safePage === p ? " active" : ""}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                className="perf-page-btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
              >
                <i className="bi bi-chevron-right" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
