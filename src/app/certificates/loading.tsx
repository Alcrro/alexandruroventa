import "@/features/certificates/certificates.scss";

export default function Loading() {
  return (
    <div className="certs-skeleton">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-thumb" />
          <div className="skeleton-body">
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
          </div>
        </div>
      ))}
    </div>
  );
}
