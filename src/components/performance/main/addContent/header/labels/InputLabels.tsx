"use client";
import React, { useEffect, useRef, useState } from "react";

export default function InputLabels() {
  const [titleCharactersCount, setTitleCharactersCount] = useState(75);
  const [descriptionCharactersCount, setDescriptionCharactersCount] =
    useState(100);
  const inputRef: any = useRef();

  return (
    <>
      <div className="title">
        <label htmlFor="" className="flex gap-2 items-center justify-center">
          <span>Add title to the content </span>
          <span className="max-characters">({titleCharactersCount})</span>
        </label>
        <input
          type="text"
          placeholder="Please add title name to the content"
          ref={inputRef}
          name="title-content"
          maxLength={75}
          className={`${titleCharactersCount <= 3 ? "under" : "normal"}`}
          onChange={(e) => setTitleCharactersCount(75 - e.target.value.length)}
        />
      </div>
      <div className="description">
        <label htmlFor="" className="block">
          <span>Add description to the content </span>
          <span className="max-characters">({descriptionCharactersCount})</span>
        </label>
        <input
          type="text"
          placeholder="Please add description to the content"
          name="description-content"
          maxLength={100}
          onChange={(e) =>
            setDescriptionCharactersCount(100 - e.target.value.length)
          }
          className={`${descriptionCharactersCount <= 3 ? "under" : "normal"}`}
        />
      </div>
    </>
  );
}
