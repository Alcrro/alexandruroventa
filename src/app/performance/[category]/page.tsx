import getModule from "@/_lib/languageSkill/getModule";
import Main from "./components/main/Main";
import Navbar from "./components/navbar/Navbar";
export default async function page({ params }: { params: any }) {
  const documents = await getModule(params, "");

  return (
    <>
      <Navbar />
      <Main documents={documents.languageSkillContent} />
    </>
  );
}
