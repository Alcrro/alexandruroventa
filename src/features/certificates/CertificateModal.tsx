"use client";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "./certificates.scss";

export default function CertificateModal({ children }: { children: React.ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const dismiss = useCallback(() => router.back(), [router]);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current) dismiss();
    },
    [dismiss]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dismiss]);

  return (
    <div ref={overlay} className="cert-modal-overlay" onClick={onClick}>
      <div className="cert-modal-inner">{children}</div>
    </div>
  );
}
