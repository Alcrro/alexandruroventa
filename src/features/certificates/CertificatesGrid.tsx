"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { iCertificate } from "@/types";
import CertificateCard from "./CertificateCard";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

interface Props {
  data: iCertificate[];
  page: number;
  totalPages: number;
  filterKey: string;
}

export default function CertificatesGrid({ data, page, totalPages, filterKey }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setPage(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/certificates?${params.toString()}`);
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={filterKey}
          variants={container}
          initial="hidden"
          animate="visible"
          className="certs-grid"
        >
          {data.map((cert) => (
            <motion.div key={cert.slug} variants={card}>
              <CertificateCard cert={cert} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

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
