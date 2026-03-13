import { Hero } from "@/components/sections/Hero";
import { ValueProp } from "@/components/sections/ValueProp";
import { Process } from "@/components/sections/Process"; // Import
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogSection } from "@/components/sections/BlogSection";
import { Newsletter } from "@/components/sections/Newsletter";
import { PressLogos } from "@/components/sections/PressLogos";
import { VideoTestimonials } from "@/components/sections/VideoTestimonials";
import { ExpandedServices } from "@/components/sections/ExpandedServices";
import { RankingCta } from "@/components/sections/RankingCta";
import { FaqSection } from "@/components/sections/FaqSection";
import { client } from "@/sanity/lib/client";

export default async function HomePage() {
  // Fetch recent blog posts
  const postsQuery = `*[_type == "post" && status == "published"] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    summary,
    mainImage{asset->{url}, alt},
    "categories": categories[]{
      "title": title,
      "slug": slug.current,
      "color": color
    },
    publishedAt,
    featured,
    readTime
  }`

  const posts = await client.fetch(postsQuery)

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

        {/* Blog Section - Latest Insights */}
        <BlogSection posts={posts} title="Latest Insights" subtitle="Expert tips and strategies to help grow your business" />

        {/* Custom Bento Call To Action: Ranking #1 */}
        <RankingCta />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Newsletter - Magnetic Input */}
        <Newsletter />
    </div>
  );
}
