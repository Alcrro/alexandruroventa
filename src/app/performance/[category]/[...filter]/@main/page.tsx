import getModule from "@/_lib/languageSkill/getModule";
import algorithmTest from "@/components/performance/components/algorithmTest";
import Main from "@/components/performance/main/Main";
import React from "react";

export default async function page({ params }: { params: any }) {
  const filter = algorithmTest(params.filter);
  const content = await getModule(params, filter?.str);

  return (
    <div>
      <Main documents={content.languageSkillContent} />
    </div>
  );
}
