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

// ISR: Revalidate homepage when content tags change
export const revalidate = 3600 // 1 hour fallback (tags can revalidate on-demand)

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

  // Fetch recent testimonials
  const testimonialsQuery = `*[_type == "testimonial" && featured == true] | order(order asc)[0...10]{
    "name": name,
    "role": coalesce(role, ""),
    "company": company,
    "image": avatar.asset->url,
    "quote": quote,
    "rating": rating
  }`

  // Fetch videos (case studies/tutorials/insights)
  const videoTestimonialsQuery = `*[_type == "video"] | order(publishedAt desc)[0...4]{
    _id,
    "client": title,
    title,
    description,
    "thumbnailUrl": customThumbnail.asset->url,
    "videoUrl": youtubeUrl,
    "youtubeId": videoId
  }`

  // Fetch case studies
  const caseStudiesQuery = `*[_type == "caseStudy"] | order(publishedAt desc)[0...4]{
    _id,
    title,
    "slug": slug.current,
    "category": client.industry,
    "image": heroImage.asset->url,
    "description": tagline
  }`

  const [posts, testimonials, videoTestimonials, caseStudies] = await Promise.all([
    client.fetch(postsQuery, {}, { cache: 'force-cache', next: { tags: ["posts"] } }),
    client.fetch(testimonialsQuery, {}, { cache: 'force-cache', next: { tags: ["testimonials"] } }),
    client.fetch(videoTestimonialsQuery, {}, { cache: 'force-cache', next: { tags: ["videos"] } }),
    client.fetch(caseStudiesQuery, {}, { cache: 'force-cache', next: { tags: ["case-studies", "caseStudies"] } }),
  ])

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
        <WorkShowcase caseStudies={caseStudies || []} />

        {/* Text Testimonials - Infinite Marquee */}
        <Testimonials testimonials={testimonials || []} />

        {/* Video Testimonials - Interactive Grid */}
        <VideoTestimonials testimonials={videoTestimonials || []} />

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
