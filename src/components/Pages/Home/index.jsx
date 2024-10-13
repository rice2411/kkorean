import { Section } from "@/components/Organisms";
import { HorizontalRule } from "@/components/Atoms";
import { FloatButton } from "@/components/Molecules";

function HomePage() {
    return (
        <>
            <Section.HeroSection />
            <HorizontalRule />
            <Section.FeatureSection />
            <HorizontalRule />
            <Section.CTASection />
            <HorizontalRule />
            <Section.PricingSection />
            <HorizontalRule />
            <Section.AboutUSSection />
            <HorizontalRule />
            <Section.ContentSection />
            <HorizontalRule />
            <Section.TestimonialSection />
            <HorizontalRule />
            <Section.StatictisSection />
            <HorizontalRule />
            <Section.BlogSection />
            <FloatButton.BackToTopButton />
            <FloatButton.SocialMediaButton />
        </>
    );
}

export default HomePage;
