import React from "react";

interface IWrapper {
  title: string;
  description: string;
}

export default function ContentWrapper({ title, description }: IWrapper) {
  return (
    <>
      <span className="title text-center">{title}</span>
      <span className="content flex flex-col text-center">
        <span className="">{description}</span>
      </span>
    </>
  );
}
