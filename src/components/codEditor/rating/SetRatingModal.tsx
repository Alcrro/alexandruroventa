"use client";
import { useState } from "react";
import "./setRatingModal.scss";

export default function SetRatingModal({
  isOpen,
  onClose,
  category,
  slug,
  onRated,
}: {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  slug: string;
  onRated: (avg: number, count: number) => void;
}) {
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (selected === 0) {
      setMessage("Select a rating first.");
      setIsError(true);
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/performance/${encodeURIComponent(category)}/${encodeURIComponent(slug)}/rate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating: selected }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setIsError(false);
        setMessage("Thanks for your rating!");
        onRated(data.average, data.count);
        setSelected(0);
        setTimeout(() => { setMessage(""); onClose(); }, 1500);
      }
    } catch {
      setMessage("Something went wrong.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`set-rating-modal-container${isOpen ? " isOpen" : ""}`}>
      <div className="set-rating-modal-inner">
        <div className="header">
          <div className="title">Rate this entry</div>
          <div className="close" onClick={onClose}>✕</div>
        </div>
        <div className="body">
          <div className="chose-stars-title text-center">Pick a number (1–5):</div>
          <div className="chose-stars-counter">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className={`star-rate${selected === n ? " active" : ""}`}
                onClick={() => setSelected(n)}
              >
                {n}
              </div>
            ))}
          </div>
        </div>
        <div className="footer">
          <div className="set-rating-btn">
            {message && (
              <div className={`success-message text-center ${isError ? "text-red-600" : "text-green-600"}`}>
                {message}
              </div>
            )}
            <button onClick={submit} disabled={loading}>
              {loading ? "Saving…" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
