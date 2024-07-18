import getModule from "@/_lib/languageSkill/getModule";
import algorithmTest from "@/components/performance/components/algorithmTest";
import Main from "@/components/performance/main/Main";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const filter = algorithmTest(params.filter);
  const content = await getModule(params, filter?.str, searchParams);

  return (
    <div>
      <Main documents={content.languageSkillContent} params={params} />
    </div>
  );
}
