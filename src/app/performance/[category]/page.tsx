import getModule from "@/_lib/languageSkill/getModule";
import Navbar from "@/components/performance/components/Navbar";
import NoRecords from "@/components/performance/components/NoRecords";
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
  let contentLength = categoryType?.languageSkillContent
    ?.map((item: any) => item.data)
    .flat(1).length;

  return (
    <>
      {contentLength !== 0 ? (
        <>
          <Navbar params={params} />
          <Main documents={categoryType.languageSkillContent} params={params} />
        </>
      ) : (
        <NoRecords />
      )}
    </>
  );
}
