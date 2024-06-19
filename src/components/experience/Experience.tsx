"use client";
import React, { useState } from "react";
import "./myExperience.scss";
import { iExperience } from "@/types";
import YearCount from "./YearCount";

export default function Experience({
  experiences,
}: {
  experiences: iExperience[];
}) {
  const [compId, setCompId] = useState<number>();

  const moreDescriptionHandler = (companyId: number) => {
    if (compId === companyId) {
      setCompId(-1);
    } else {
      setCompId(companyId);
    }
  };

  experiences.map((item) => console.log(item.currentYear));

  return (
    <div className="my-experience">
      <div className="timeline ">
        {experiences
          .map((company) => (
            <div className="container " key={company.idIncNumber}>
              <div className={`logo-company ${company.className}`}></div>
              <div
                className={`text-box flex flex-col justify-start${
                  compId === company.idIncNumber
                    ? " collapse-in"
                    : " collapse-out"
                }`}
              >
                <h2>{company.titleDescription}</h2>
                <small>
                  <span>{new Date(company?.startYear).getFullYear()}</span>{" "}
                  <span> - </span>
                  <span>
                    {company.currentYear === null
                      ? new Date(company?.endYear!).getFullYear()
                      : "current"}
                  </span>
                  <YearCount company={company} />
                </small>
                <div
                  className="text h-[100%]"
                  dangerouslySetInnerHTML={{
                    __html: `${company.descriptionMore}`,
                  }}
                ></div>
                <span className="arrow-container"></span>

                <div
                  className="more block text-right"
                  onClick={() => moreDescriptionHandler(company.idIncNumber)}
                >
                  {compId !== company.idIncNumber ? (
                    <span className="">more</span>
                  ) : (
                    <span className="">less</span>
                  )}
                </div>
              </div>
            </div>
          ))
          .sort((a, b) => (a > b ? 1 : -1))}
      </div>
    </div>
  );
}
