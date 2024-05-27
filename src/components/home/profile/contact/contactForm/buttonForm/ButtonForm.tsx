import React from "react";
import "./buttonForm.scss";
export default function ButtonForm() {
  return (
    <div className="button-container">
      <button
        type="submit"
        className="btn btn-form-submit p-2 w-full sm:max-w-[140px] sm:p-2 bg-white text-black rounded-xl  after:content-['\F6B9'] after:font-['Bootstrap-icons']"
      >
        <span className="block">Submit</span>
      </button>
    </div>
  );
}
