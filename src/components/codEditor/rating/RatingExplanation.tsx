import React, { useState } from "react";
import RatingModal from "./RatingModal";

export default function RatingExplanation() {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
  return (
    <div className="rating-code-explanation">
      <RatingModal modalHandler={setIsRatingModalOpen} />
    </div>
  );
}
