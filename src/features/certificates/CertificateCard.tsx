import Image from "next/image";
import Link from "next/link";
import { iCertificate } from "@/types";

const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

export default function CertificateCard({ cert }: { cert: iCertificate }) {
  const year = cert.date ? new Date(cert.date).getFullYear() : null;

  return (
    <Link href={`/certificates/${cert.slug}`} className="cert-card">
      <div className="cert-thumb">
        <Image
          src={cert.src}
          alt={`${cert.organization} — ${cert.languageLearnt}`}
          width={600}
          height={420}
          className="cert-thumb-img"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          loading="lazy"
        />
      </div>
      <div className="cert-info">
        <span className="cert-lang">{cert.languageLearnt}</span>
        <span className="cert-org">
          {cert.organization}
          {year && <span className="cert-year"> · {year}</span>}
        </span>
        {cert.author?.length > 0 && (
          <span className="cert-author">{cert.author.join(", ")}</span>
        )}
      </div>
    </Link>
  );
}
