import React, { useState } from "react";
import "./myExperience.scss";
import { iExperience } from "@/types";
import YearCount from "./YearCount";
import ExperienceContent from "./myExperience/ExperienceContent";
import ExperienceContainer from "./myExperience/ExperienceContainer";
import AddExperienceButton from "./addExperience/addExperiencebutton/AddExperienceButton";

export default function Experience({
  experiences,
}: {
  experiences: iExperience[];
}) {
  return (
    <div className="my-experience">
      <AddExperienceButton />
      <div className="timeline ">
        {experiences
          .map((company) => (
            <div className="container " key={company.idIncNumber}>
              <div className={`logo-company ${company.className}`}></div>
              <ExperienceContainer company={company}>
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
                <ExperienceContent company={company} />
                <span className="arrow-container"></span>
              </ExperienceContainer>
            </div>
          ))
          .sort((a, b) => (a > b ? 1 : -1))}
      </div>
    </div>
  );
}
