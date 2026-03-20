import { Hero } from "@/components/sections/Hero";
import dynamic from "next/dynamic";
import { client } from "@/sanity/lib/client";
import { Suspense } from "react";

// Loading component
function SectionLoader() {
  return (
    <div className="w-full h-96 flex items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// All sections below hero — dynamically imported to reduce initial JS bundle
// Components with "use client" directive won't be SSR'd
const ValueProp = dynamic(() => import("@/components/sections/ValueProp").then(m => m.ValueProp), {
  loading: () => <SectionLoader />,
});

const PainPoints = dynamic(() => import("@/components/sections/PainPoints").then(m => m.PainPoints), {
  loading: () => <SectionLoader />,
});

const ServicesShowcase = dynamic(() => import("@/components/sections/ServicesShowcase").then(m => m.ServicesShowcase), {
  loading: () => <SectionLoader />,
});

const Process = dynamic(() => import("@/components/sections/Process").then(m => m.Process), {
  loading: () => <SectionLoader />,
});

const ExpandedServices = dynamic(() => import("@/components/sections/ExpandedServices").then(m => m.ExpandedServices), {
  loading: () => <SectionLoader />,
});

const WorkShowcase = dynamic(() => import("@/components/sections/WorkShowcase").then(m => m.WorkShowcase), {
  loading: () => <SectionLoader />,
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(m => m.Testimonials), {
  loading: () => <SectionLoader />,
});

const VideoTestimonials = dynamic(() => import("@/components/sections/VideoTestimonials").then(m => m.VideoTestimonials), {
  loading: () => <SectionLoader />,
});

const BlogSection = dynamic(() => import("@/components/sections/BlogSection").then(m => m.BlogSection), {
  loading: () => <SectionLoader />,
});

const PressLogos = dynamic(() => import("@/components/sections/PressLogos").then(m => m.PressLogos), {
  loading: () => <div className="w-full h-32 flex items-center justify-center bg-slate-50 animate-pulse" />,
});

const RankingCta = dynamic(() => import("@/components/sections/RankingCta").then(m => m.RankingCta), {
  loading: () => <SectionLoader />,
});

const FaqSection = dynamic(() => import("@/components/sections/FaqSection").then(m => m.FaqSection), {
  loading: () => <SectionLoader />,
});

const Newsletter = dynamic(() => import("@/components/sections/Newsletter").then(m => m.Newsletter), {
  loading: () => <SectionLoader />,
});

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
        <Suspense fallback={<SectionLoader />}>
          <ValueProp />
        </Suspense>

        {/* Pain Points - UAE Business Owner Frustrations */}
        <Suspense fallback={<SectionLoader />}>
          <PainPoints />
        </Suspense>

        {/* Services Showcase - Horizontal Scroll (GSAP) */}
        <Suspense fallback={<SectionLoader />}>
          <ServicesShowcase />
        </Suspense>

      {/* Comprehensive Services - All 55 Services Listed */}
      <Suspense fallback={<SectionLoader />}>
        <ExpandedServices />
      </Suspense>

        {/* Process - Vertical Timeline (GSAP) */}
        <Suspense fallback={<SectionLoader />}>
          <Process />
        </Suspense>

        {/* Work Showcase - Curtain Reveal (GSAP) */}
        <Suspense fallback={<SectionLoader />}>
          <WorkShowcase caseStudies={caseStudies || []} />
        </Suspense>

        {/* Text Testimonials - Infinite Marquee */}
        <Suspense fallback={<SectionLoader />}>
          <Testimonials testimonials={testimonials || []} />
        </Suspense>

        {/* Video Testimonials - Interactive Grid */}
        <Suspense fallback={<SectionLoader />}>
          <VideoTestimonials testimonials={videoTestimonials || []} />
        </Suspense>

        {/* Press Logos - As Seen In Marquee */}
        <Suspense fallback={<div className="w-full h-32 flex items-center justify-center bg-slate-50 animate-pulse" />}>
          <PressLogos />
        </Suspense>

        {/* Blog Section - Latest Insights */}
        <Suspense fallback={<SectionLoader />}>
          <BlogSection posts={posts} title="Latest Insights" subtitle="Expert tips and strategies to help grow your business" />
        </Suspense>

        {/* Custom Bento Call To Action: Ranking #1 */}
        <Suspense fallback={<SectionLoader />}>
          <RankingCta />
        </Suspense>

        {/* Frequently Asked Questions */}
        <Suspense fallback={<SectionLoader />}>
          <FaqSection />
        </Suspense>

        {/* Newsletter - Magnetic Input */}
        <Suspense fallback={<SectionLoader />}>
          <Newsletter />
        </Suspense>
    </div>
  );
}
