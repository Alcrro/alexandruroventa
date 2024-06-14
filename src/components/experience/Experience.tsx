"use client";
import React, { useState } from "react";
import "./myExperience.scss";

export default function Experience({ experiences }: { experiences: any[] }) {
  const [compId, setCompId] = useState<number>();

  const moreDescriptionHandler = (companyId: number) => {
    if (compId === companyId) {
      setCompId(-1);
    } else {
      setCompId(companyId);
    }
  };

  return (
    <div className="my-experience">
      <div className="timeline ">
        {experiences
          .map((company) => (
            <div className="container " key={company.id}>
              <div className={`logo-company ${company.className}`}></div>
              <div
                className={`text-box flex flex-col justify-start${
                  compId === company.id ? " collapse-in" : " collapse-out"
                }`}
              >
                <h2>{company.description.title}</h2>
                <small>
                  <span>{company.year.start}</span> <span> - </span>
                  <span>
                    {company.year.current === undefined
                      ? company.year.end
                      : "current"}
                  </span>
                  <span className="total px-2 relative">
                    {Number(company.year.end) - Number(company.year.start) > 1
                      ? `(${
                          Number(company.year.end) - Number(company.year.start)
                        } years)`
                      : `(${
                          Number(company.year.end) - Number(company.year.start)
                        } year)`}
                  </span>
                </small>
                <div className="text h-[100%]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis repudiandae cumque dolorem odio voluptatum repellendus
                  animi fugiat illum esse quam explicabo distinctio possimus
                  vitae ducimus, itaque commodi modi in minus.
                </div>
                <span className="arrow-container"></span>

                <div
                  className="more block text-right"
                  onClick={() => moreDescriptionHandler(company.id)}
                >
                  {compId !== company.id ? (
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
