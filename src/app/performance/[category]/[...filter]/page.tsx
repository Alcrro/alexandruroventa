import getModule from "@/_lib/languageSkill/getModule";

import algorithmTest from "./algorithmTest";
import Navbar from "../components/navbar/Navbar";
import Main from "../components/main/Main";


export default async function page({ params }: { params: any }) {
  const urlSlug = algorithmTest(params.filter);

  const documents = await getModule(params, urlSlug?.str);

  return (
    <>
      <Navbar />
      <Main documents={documents.languageSkillContent} />
    </>
  );
}
