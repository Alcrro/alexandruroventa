import { iExperience } from "@/types";
import React from "react";

export default function YearCount({ company }: { company: iExperience }) {
  let now = new Date(company.currentYear!).toISOString();
  let startYear = new Date(company.startYear!).toISOString();
  let endYear = new Date(company.endYear!).toISOString();

  let currentYearIntoMillS = new Date(Date.parse(now)).getFullYear();
  let currentMonthIntoMillS = new Date(Date.parse(now)).getMonth();
  let startYearIntoMillS = new Date(Date.parse(startYear)).getFullYear();
  let startMonthIntoMillS = new Date(Date.parse(startYear)).getMonth();
  let endYearIntoMillS = new Date(Date.parse(endYear)).getFullYear();
  let endMonthIntoMillS = new Date(Date.parse(endYear)).getMonth();

  let getDifferenceYear1 = endYearIntoMillS - startYearIntoMillS;
  let getDifferenceMonth1 = endMonthIntoMillS - startMonthIntoMillS;

  let getDifferenceYear2 = currentYearIntoMillS - startYearIntoMillS;
  let getDifferenceMonth2 = currentMonthIntoMillS - startMonthIntoMillS;

  return (
    <span className="total px-2 relative">
      {company.endYear !== null && company.currentYear === null
        ? `(${getDifferenceYear1} ${getDifferenceYear1 < 2 ? "year" : "years"}${
            getDifferenceMonth1 < 1
              ? ""
              : getDifferenceMonth1 === 1
              ? `; ${getDifferenceMonth1} month`
              : getDifferenceMonth1 > 1 && `; ${getDifferenceMonth1} months`
          })`
        : company.currentYear !== null &&
          company.endYear === null &&
          `(${getDifferenceYear2} ${getDifferenceYear2 < 2 ? "year" : "years"}${
            getDifferenceMonth2 < 1
              ? ""
              : getDifferenceMonth2 === 1
              ? `; ${getDifferenceMonth2} month`
              : getDifferenceMonth2 > 1 && `; ${getDifferenceMonth2} months`
          })`}
    </span>
  );
}
