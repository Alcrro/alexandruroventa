"use client";
import { useState } from "react";
import RatingModal from "./RatingModal";
import SetRatingModal from "./SetRatingModal";

export default function RatingEditor({
  category = "",
  slug = "",
  initialRating = 0,
  initialCount = 0,
}: {
  category?: string;
  slug?: string;
  initialRating?: number;
  initialCount?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(initialRating);
  const [count, setCount] = useState(initialCount);

  return (
    <div className="rating-algorithm-code">
      <RatingModal rating={rating} count={count} onOpen={() => setIsOpen(true)} />
      <SetRatingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        category={category}
        slug={slug}
        onRated={(avg, cnt) => { setRating(avg); setCount(cnt); }}
      />
    </div>
  );
}
