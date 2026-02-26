import { Hero } from "@/components/sections/Hero";
import { ValueProp } from "@/components/sections/ValueProp";
import { Process } from "@/components/sections/Process"; // Import
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { WorkShowcase } from "@/components/sections/WorkShowcase"; 
import { Testimonials } from "@/components/sections/Testimonials";
import { FounderNote } from "@/components/sections/FounderNote";
import { Newsletter } from "@/components/sections/Newsletter";
import { PressLogos } from "@/components/sections/PressLogos";
import { VideoTestimonials } from "@/components/sections/VideoTestimonials";
import { ExpandedServices } from "@/components/sections/ExpandedServices";
import { RankingCta } from "@/components/sections/RankingCta";
import { FaqSection } from "@/components/sections/FaqSection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
        {/* Hero Section with 3D Scene */}
        <Hero />

        {/* Value Proposition - Bento Grid */}
        <ValueProp />


        {/* Services Showcase - Horizontal Scroll (GSAP) */}
        <ServicesShowcase />

      {/* Comprehensive Services - All 55 Services Listed */}
      <ExpandedServices />

        {/* Process - Vertical Timeline (GSAP) */}
        <Process />

        {/* Work Showcase - Curtain Reveal (GSAP) */}
        <WorkShowcase />

        {/* Text Testimonials - Infinite Marquee */}
        <Testimonials />

        {/* Video Testimonials - Interactive Grid */}
        <VideoTestimonials />

        {/* Press Logos - As Seen In Marquee */}
        <PressLogos />

        {/* Founder's Note - CEO Section */}
        <FounderNote />

        {/* Custom Bento Call To Action: Ranking #1 */}
        <RankingCta />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Newsletter - Magnetic Input */}
        <Newsletter />
    </div>
  );
}
