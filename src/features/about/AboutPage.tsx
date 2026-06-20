import AboutIntro from "./AboutIntro";
import AboutEducation from "./AboutEducation";
import AboutExperienceSummary from "./AboutExperienceSummary";
import AboutTech from "./AboutTech";
import "./about.scss";

export default function AboutPage() {
  return (
    <main className="about-page">
      <AboutIntro />
      <AboutEducation />
      <AboutExperienceSummary />
      <AboutTech />
    </main>
  );
}
