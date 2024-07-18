import React from "react";
import "./header.scss";
import algorithmTest from "../../components/algorithmTest";
import { IHeader } from "@/types";

export default async function Header({ params }: { params: any }) {
  const header = await fetch(
    `${process.env.NEXTAUTH_URL}/api/performance/${params.category}/slug/${params.slug}`
  );

  const dataResponse = await header.json();


  const data: IHeader = dataResponse?.languageSkillContent[0];

  return (
    <div className="content-header-container">
      <div className="content-header-inner">
        <div className="title-and-description">
          <h1 className="title text-3xl pb-4">
            {data?.category.toLocaleUpperCase()}: {data?.contentTitle}
          </h1>
          <h3 className="description text-xl">{data?.contentDescription}</h3>
        </div>
        <div className="content-version flex flex-col justify-center text-center">
          <span className="title-version text-sm">version: </span>
          <span className="version-number text-gray-400 text-xs">
            1.2 | 20/02/2024
          </span>
        </div>
      </div>
    </div>
  );
}
