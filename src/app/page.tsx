import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { ValueProp } from "@/components/sections/ValueProp";
import { Process } from "@/components/sections/Process"; // Import
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { WorkShowcase } from "@/components/sections/WorkShowcase"; 
import { Testimonials } from "@/components/sections/Testimonials";
import { FounderNote } from "@/components/sections/FounderNote";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <div className="flex flex-col">
        {/* Hero Section with 3D Scene */}
        <Hero />

        {/* Social Proof - Client Logos Marquee */}
        <SocialProof />

        {/* Value Proposition - Bento Grid */}
        <ValueProp />

        {/* Process - Vertical Timeline (GSAP) */}
        <Process />

        {/* Services Showcase - Horizontal Scroll (GSAP) */}
        <ServicesShowcase />

        {/* Work Showcase - Curtain Reveal (GSAP) */}
        <WorkShowcase />

        {/* Testimonials - Infinite Marquee */}
        <Testimonials />

        {/* Founder's Note - CEO Section */}
        <FounderNote />

        {/* Newsletter - Magnetic Input */}
        <Newsletter />
    </div>
  );
}
