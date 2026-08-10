"use client";
import { BsDownload } from "react-icons/bs";

export default function CVPrintButton() {
  return (
    <button className="cv-print-btn" onClick={() => window.print()}>
      <BsDownload />
      Download PDF
    </button>
  );
}
