import { Hero } from "@/components/sections/Hero";
import { ValueProp } from "@/components/sections/ValueProp";
import { PainPoints } from "@/components/sections/PainPoints";
import dynamic from "next/dynamic";
import { client } from "@/sanity/lib/client";

// Below-fold sections — dynamically imported to reduce initial JS bundle
const ServicesShowcase = dynamic(() => import("@/components/sections/ServicesShowcase").then(m => m.ServicesShowcase));
const Process = dynamic(() => import("@/components/sections/Process").then(m => m.Process));
const ExpandedServices = dynamic(() => import("@/components/sections/ExpandedServices").then(m => m.ExpandedServices));
const WorkShowcase = dynamic(() => import("@/components/sections/WorkShowcase").then(m => m.WorkShowcase));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(m => m.Testimonials));
const VideoTestimonials = dynamic(() => import("@/components/sections/VideoTestimonials").then(m => m.VideoTestimonials));
const BlogSection = dynamic(() => import("@/components/sections/BlogSection").then(m => m.BlogSection));
const PressLogos = dynamic(() => import("@/components/sections/PressLogos").then(m => m.PressLogos));
const RankingCta = dynamic(() => import("@/components/sections/RankingCta").then(m => m.RankingCta));
const FaqSection = dynamic(() => import("@/components/sections/FaqSection").then(m => m.FaqSection));
const Newsletter = dynamic(() => import("@/components/sections/Newsletter").then(m => m.Newsletter));

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
  const caseStudiesQuery = `*[_type == "caseStudy"] | order(order asc)[0...4]{
    _id,
    title,
    "slug": slug.current,
    "description": tagline,
    "image": image.asset->url
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

        {/* Pain Points - UAE Business Owner Frustrations */}
        <PainPoints />

        {/* Services Showcase - Horizontal Scroll (GSAP) */}
        <div className="perf-defer">
          <ServicesShowcase />
        </div>

      {/* Comprehensive Services - All 55 Services Listed */}
      <div className="perf-defer">
        <ExpandedServices />
      </div>

        {/* Process - Vertical Timeline (GSAP) */}
        <div className="perf-defer">
          <Process />
        </div>

        {/* Work Showcase - Curtain Reveal (GSAP) */}
        <div className="perf-defer">
          <WorkShowcase caseStudies={caseStudies || []} />
        </div>

        {/* Text Testimonials - Infinite Marquee */}
        <div className="perf-defer overflow-hidden">
          <Testimonials testimonials={testimonials || []} />
        </div>

        {/* Video Testimonials - Interactive Grid */}
        <div className="perf-defer">
          <VideoTestimonials testimonials={videoTestimonials || []} />
        </div>

        {/* Press Logos - As Seen In Marquee */}
        <div className="perf-defer overflow-hidden">
          <PressLogos />
        </div>

        {/* Blog Section - Latest Insights */}
        <div className="perf-defer">
          <BlogSection posts={posts} title="Latest Insights" subtitle="Expert tips and strategies to help grow your business" />
        </div>

        {/* Custom Bento Call To Action: Ranking #1 */}
        <div className="perf-defer">
          <RankingCta />
        </div>

        {/* Frequently Asked Questions */}
        <div className="perf-defer">
          <FaqSection />
        </div>

        {/* Newsletter - Magnetic Input */}
        <div className="perf-defer">
          <Newsletter />
        </div>
    </div>
  );
}
