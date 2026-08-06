import HeroSection from "./HeroSection";
import FeaturedProjects from "./FeaturedProjects";
import TechStack from "./TechStack";

export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <FeaturedProjects />
      <TechStack />
    </div>
  );
}
