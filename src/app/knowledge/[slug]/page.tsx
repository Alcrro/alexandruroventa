import CodeEditorComponent from "@/components/codEditor/CodeEditorComponent";
import NavbarContentComponent from "@/components/codEditor/navbarContent/NavbarContentComponent";
export const dynamic = "force-dynamic";
import React from "react";

export default async function page({ params }: { params: { slug: string } }) {
  // const dataId = await getContent(params);

  // const document = await getModule(params);

  // const data = await getContentEditor(dataId[0].content);

  return (
    <>
      {/* <NavbarContentComponent />
      <CodeEditorComponent
        content={data}
        document={document}
        contentSD={dataId}
      /> */}
    </>
  );
}
