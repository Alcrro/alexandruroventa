"use client";
import React, { SetStateAction, useState } from "react";
import "./setRatingModal.scss";
export default function SetRatingModal({
  isRatingModalOpen,
  modalHandler,
}: {
  isRatingModalOpen: boolean;
  modalHandler: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [starNumber, setStarNumber] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [submit, setSubmit] = useState(false);

  const arrayRating = [1, 2, 3, 4, 5];
  console.log(starNumber);

  const setNumberHandler = (star: number) => {
    setStarNumber(star);
  };

  const submitHandler = () => {
    setNumberHandler;
    if (starNumber === 0) {
      setErrorMessage("You can't submit without rating number");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    } else {
      setErrorMessage("Thank you for your feedback!");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
    setStarNumber(0);
  };

  return (
    <div
      className={`set-rating-modal-container${
        isRatingModalOpen ? " isOpen" : ""
      }`}
    >
      <div className="set-rating-modal-inner">
        <div className="header">
          <div className="title">Add rating to the code editor</div>
          <div className="close" onClick={() => modalHandler(false)}>
            X
          </div>
        </div>
        <div className="body">
          <div className="chose-stars-title text-center">
            Chose a star to add on this code:
          </div>
          <div className="chose-stars-counter">
            {arrayRating.map((rate, key) => (
              <div
                className={`star-rate${starNumber === rate ? " active" : ""}`}
                onClick={submitHandler}
                key={key}
              >
                {rate}
              </div>
            ))}
          </div>
        </div>
        <div className="footer">
          <div className="set-rating-btn">
            <div
              className={`success-message text-center ${
                errorMessage === "" ? "text-green-600" : "text-red-600"
              }`}
            >
              {errorMessage}
            </div>

            <button onClick={submitHandler}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
