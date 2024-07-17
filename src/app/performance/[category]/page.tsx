import getModule from "@/_lib/languageSkill/getModule";
import Navbar from "@/components/performance/components/Navbar";
import Main from "@/components/performance/main/Main";
import React from "react";

export default async function page({ params }: { params: { category: any } }) {
  const categoryType = await getModule(params);

  return (
    <>
      <Navbar params={params} />
      <Main documents={categoryType.languageSkillContent} params={params}/>
    </>
  );
}
