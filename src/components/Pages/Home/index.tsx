import { Section } from "@/components/Organisms";
import { Box, HorizontalRule } from "@/components/Atoms";
import { FloatButton } from "@/components/Molecules";
import { useRef } from "react";
import { useIsVisible } from "@/hooks";

function HomePage() {
  const sections = [
    { component: <Section.HeroSection />, key: "hero" },
    { component: <Section.FeatureSection />, key: "feature" },
    { component: <Section.CTASection />, key: "cta" },
    { component: <Section.PricingSection />, key: "pricing" },
    { component: <Section.AboutUSSection />, key: "about" },
    { component: <Section.ContentSection />, key: "content" },
    { component: <Section.TestimonialSection />, key: "testimonial" },
    { component: <Section.StatictisSection />, key: "statistics" },
    { component: <Section.BlogSection />, key: "blog" },
  ];

  const refs = sections.map(() => useRef<HTMLDivElement>(null));
  const visibility = refs.map((ref) => useIsVisible(ref));

  return (
    <>
      {sections.map((section, index) => (
        <Box
          key={section.key}
          ref={refs[index]}
          className={`transition-opacity ease-in duration-1000 ${
            visibility[index] ? "opacity-100" : "opacity-0"
          }`}
        >
          {section.component}
          {index < sections.length - 1 && <HorizontalRule />}
        </Box>
      ))}

      <FloatButton.BackToTopButton />
      <FloatButton.SocialMediaButton />
    </>
  );
}

export default HomePage;
