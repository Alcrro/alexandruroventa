import getModule from "@/_lib/languageSkill/getModule";
import Pagination from "@/components/pagination/Pagination";
import Navbar from "@/components/performance/components/Navbar";
import Main from "@/components/performance/main/Main";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: { category: any };
  searchParams: any;
}) {
  const categoryType = await getModule(params, "", searchParams);

  return (
    <>
      <Navbar params={params} />
      <Main documents={categoryType.languageSkillContent} params={params} />
     
    </>
  );
}
