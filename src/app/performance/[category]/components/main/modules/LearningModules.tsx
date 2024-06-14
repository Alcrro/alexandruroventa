import ContentWrapper from "@/components/performance/main/modal/modul/ContentWrapper";
import React from "react";

export default function LearningModules({
  moduleType,
}: {
  moduleType: string;
}) {
  return (
    <div className="wrapper learning-modules flex flex-col self-start gap-4">
      <ContentWrapper title="Module type:" description={moduleType} />
    </div>
  );
}
