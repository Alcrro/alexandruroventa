import React, { useState } from "react";
import RatingModal from "./RatingModal";
import SetRatingModal from "./SetRatingModal";

export default function RatingEditor() {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);

  return (
    <div className="rating-algorithm-code">
      <RatingModal modalHandler={setIsRatingModalOpen} />
      <SetRatingModal isRatingModalOpen={isRatingModalOpen} modalHandler={setIsRatingModalOpen}/>
    </div>
  );
}
