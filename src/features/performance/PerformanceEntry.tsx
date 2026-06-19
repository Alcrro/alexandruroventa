import Link from "next/link";
import dynamic from "next/dynamic";
import "./performance.scss";

const MonacoEditor = dynamic(() => import("./MonacoEditor"), { ssr: false });

interface EntryData {
  category: string;
  contentTitle: string;
  contentDescription: string;
  languageType: "course" | "project";
  uniqueNumberByCategory: number;
}

interface CodeVersionData {
  versionCode: string;
  code: string;
  date: string;
}

export default function PerformanceEntry({
  entry,
  codeVersion,
}: {
  entry: EntryData;
  codeVersion?: CodeVersionData | null;
}) {
  const date = codeVersion?.date
    ? new Date(codeVersion.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <section className="perf-entry-section">
      <Link href={`/performance/${entry.category}`} className="perf-entry-back">
        <i className="bi bi-arrow-left" />
        Back to {entry.category}
      </Link>

      <div className="perf-entry-header">
        <p className="perf-entry-category">
          {entry.category} · #{entry.uniqueNumberByCategory}
        </p>
        <h1 className="perf-entry-title">{entry.contentTitle}</h1>
        <p className="perf-entry-desc">{entry.contentDescription}</p>
        <div className="perf-entry-meta">
          <span className={`perf-type-badge ${entry.languageType}`}>
            {entry.languageType}
          </span>
          {codeVersion && (
            <span className="perf-entry-version">
              {codeVersion.versionCode}{date ? ` · ${date}` : ""}
            </span>
          )}
        </div>
      </div>

      {codeVersion?.code ? (
        <MonacoEditor code={codeVersion.code} />
      ) : (
        <p className="perf-empty">No code attached to this entry.</p>
      )}
    </section>
  );
}
