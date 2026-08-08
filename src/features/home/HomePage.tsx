import HeroSection from "./HeroSection";
import FeaturedProjects from "./FeaturedProjects";
import TechStack from "./TechStack";
import HomeFaq from "./HomeFaq";
import { faqs } from "./faqData";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function HomePage() {
  return (
    <div className="home-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <FeaturedProjects />
      <TechStack />
      <HomeFaq />
    </div>
  );
}
