import getModule from "@/_lib/languageSkill/getModule";
import algorithmTest from "./algorithmTest";
import Main from "@/components/performance/main/Main";
import Navbar from "../components/Navbar";

export default async function page({ params }: { params: any }) {
  const urlSlug = algorithmTest(params.filter);

  const documents = await getModule(params, urlSlug?.str);

  return (
    <>
      <Navbar params ={urlSlug}/>
      <Main documents={documents.languageSkillContent} />
    </>
  );
}
