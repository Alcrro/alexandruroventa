"use client";
import "./rating.scss";

export default function RatingModal({
  rating,
  count,
  onOpen,
}: {
  rating: number;
  count: number;
  onOpen: () => void;
}) {
  const pct = rating > 0 ? `${Math.round((rating / 5) * 100)}%` : "0%";

  return (
    <div className="rating-inner">
      <div className="stars" onClick={onOpen} title="Click to rate">
        <div className="star-inner">
          <div className="star" style={{ width: pct }} />
        </div>
      </div>
      <span>{rating > 0 ? rating.toFixed(2) : "—"}</span>
      {count > 0 && <span className="rating-count">({count})</span>}
    </div>
  );
}
