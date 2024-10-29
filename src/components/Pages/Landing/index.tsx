import { Box, HorizontalRule } from "@/components/Atoms";
import { FloatButton } from "@/components/Molecules";
import { useRef, Suspense } from "react";
import { useIsVisible } from "@/hooks";
import React from "react";
import { Section } from "@/components/Organisms";

// Lazy load các section
const FeatureSection = React.lazy(
  () => import("@/components/Organisms/Section/Feature")
);
const CTASection = React.lazy(
  () => import("@/components/Organisms/Section/CTA")
);
const PricingSection = React.lazy(
  () => import("@/components/Organisms/Section/Pricing")
);
const AboutUSSection = React.lazy(
  () => import("@/components/Organisms/Section/AboutUS")
);
const ContentSection = React.lazy(
  () => import("@/components/Organisms/Section/Content")
);
const TestimonialSection = React.lazy(
  () => import("@/components/Organisms/Section/Testimonials")
);
const StatictisSection = React.lazy(
  () => import("@/components/Organisms/Section/Statictis")
);
const BlogSection = React.lazy(
  () => import("@/components/Organisms/Section/Blog")
);

function LandingPage() {
  const sections = [
    { component: <FeatureSection />, key: "feature" },
    { component: <CTASection />, key: "cta" },
    { component: <PricingSection />, key: "pricing" },
    { component: <AboutUSSection />, key: "about" },
    { component: <ContentSection />, key: "content" },
    { component: <TestimonialSection />, key: "testimonial" },
    { component: <StatictisSection />, key: "statistics" },
    { component: <BlogSection />, key: "blog" },
  ];

  const refs = sections.map(() => useRef<HTMLDivElement>(null));
  const visibility = refs.map((ref) => useIsVisible(ref));

  return (
    <>
      <Section.HeroSection />
      <HorizontalRule />
      {sections.map((section, index) => (
        <Box
          key={section.key}
          ref={refs[index]}
          className={`transition-opacity ease-in duration-1000 ${
            visibility[index] ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Lazy load section chỉ khi nó được hiển thị */}
          {visibility[index] && (
            <Suspense fallback={<div>Loading...</div>}>
              {section.component}
              {index < sections.length - 1 && <HorizontalRule />}
            </Suspense>
          )}
        </Box>
      ))}

      <FloatButton.BackToTopButton />
      <FloatButton.SocialMediaButton />
    </>
  );
}

export default LandingPage;
