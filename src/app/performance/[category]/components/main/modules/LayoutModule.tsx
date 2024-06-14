import React from "react";
import LearningModules from "./LearningModules";
import NameModules from "./NameModules";
import DescriptionModules from "./DescriptionModules";
import DateModules from "./DateModules";
import { iModuleType } from "@/types";

export default function LayoutModule({ data }: { data: iModuleType }) {
  const { languageType, name, description, category, dataCreated } = data;

  return (
    <>
      <LearningModules moduleType={languageType} />
      <NameModules name={name} />
      <DescriptionModules description={description} />
      <DateModules dataCreated={dataCreated} />
    </>
  );
}
