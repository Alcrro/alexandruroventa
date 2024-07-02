import getModule from "@/_lib/languageSkill/getModule";
import Main from "@/components/performance/main/Main";
import React from "react";

export default async function page({ params }: { params: any }) {
  const filter = await getModule(params);
  return (
    <div>
      <Main documents={filter.languageSkillContent} />
    </div>
  );
}
