"use client";
import { useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const typeFilter = (searchParams.get("type") ?? "all") as "all" | "course" | "project";
  const sortAsc = searchParams.get("sort") !== "desc";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));

  function setParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    if (params.get("type") === "all") params.delete("type");
    if (params.get("sort") === "asc") params.delete("sort");
    if (params.get("page") === "1") params.delete("page");
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }

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
                onClick={() => setParams({ type: t === "all" ? null : t, page: null })}
              >
                {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <button
            className="perf-sort-btn"
            onClick={() => setParams({ sort: sortAsc ? "desc" : null, page: null })}
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
                onClick={() => setParams({ page: String(Math.max(1, safePage - 1)) })}
                disabled={safePage === 1}
              >
                <i className="bi bi-chevron-left" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`perf-page-btn${safePage === p ? " active" : ""}`}
                  onClick={() => setParams({ page: String(p) })}
                >
                  {p}
                </button>
              ))}
              <button
                className="perf-page-btn"
                onClick={() => setParams({ page: String(Math.min(totalPages, safePage + 1)) })}
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
