"use client";

export default function CVPrintButton() {
  return (
    <button className="cv-print-btn" onClick={() => window.print()}>
      <i className="bi bi-download" />
      Download PDF
    </button>
  );
}
