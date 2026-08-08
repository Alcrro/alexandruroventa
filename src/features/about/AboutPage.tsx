import AboutIntro from "./AboutIntro";
import AboutEducation from "./AboutEducation";
import AboutExperienceSummary from "./AboutExperienceSummary";
import AboutTech from "./AboutTech";
import "./about.scss";

export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-orb about-orb--1" aria-hidden />
      <div className="about-orb about-orb--2" aria-hidden />
      <div className="about-orb about-orb--3" aria-hidden />
      <AboutIntro />
      <AboutEducation />
      <AboutExperienceSummary />
      <AboutTech />
    </main>
  );
}
