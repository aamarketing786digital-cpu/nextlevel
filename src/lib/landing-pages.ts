export interface LandingPageConfig {
  slug: string;
  // SEO
  title: string;
  description: string;
  keywords: string[];
  // Hero image
  heroImage: string;
  hero: {
    badge: string;
    headline: string;
    subHeadline: string;
    ctaText: string;
    ctaWhatsApp: string;
    accentColor?: "amber" | "blue" | "emerald" | "rose" | "indigo" | "orange";
  };
  // Pain Points
  painPoints: {
    title: string;
    items: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  // Social Proof
  socialProof: {
    stat: string;
    statLabel: string;
    testimonial: string;
    clientName: string;
    clientRole: string;
  };
  // Process
  process: {
    title: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  // FAQ
  faq: {
    items: {
      question: string;
      answer: string;
    }[];
  };
  // Final CTA
  finalCta: {
    headline: string;
    subHeadline: string;
    formTitle: string;
  };
  // Service type for Brevo tagging
  serviceType: string;
}

export const LANDING_PAGES: Record<string, LandingPageConfig> = {
  "seo-for-restaurants-dubai": {
    slug: "seo-for-restaurants-dubai",
    title: "SEO for Restaurants Dubai | Get Found by Hungry Customers",
    description:
      "We rank restaurant websites in Dubai, Abu Dhabi & Sharjah on Google page 1 within 90 days. More diners find you, or you don't pay.",
    keywords: [
      "SEO for restaurants Dubai",
      "restaurant Google ranking UAE",
      "restaurant digital marketing Dubai",
    ],
    heroImage: "/landing/hero-seo.png",
    hero: {
      badge: "🍽️ Restaurant SEO Specialists",
      headline: "More Dubai diners find you on Google, or you don't pay.",
      subHeadline:
        "We rank restaurant websites in Dubai, Abu Dhabi & Sharjah on page 1 within 90 days. Fill more tables with customers who are actively searching for where to eat.",
      ctaText: "Get Your Free Restaurant SEO Audit",
      ctaWhatsApp:
        "Hi, I own a restaurant in Dubai and I'm interested in SEO services. Can I book a free audit?",
      accentColor: "orange",
    },
    painPoints: {
      title: "Sound familiar?",
      items: [
        {
          icon: "👁️",
          title: "Invisible on Google Maps",
          description:
            "Customers search 'best restaurant near me' and your competitor shows up first. You're losing walk-in traffic every single day.",
        },
        {
          icon: "📱",
          title: "Spending on ads with no reservations",
          description:
            "You've tried Meta ads or Google Ads, but the bookings don't match the spend. Something is broken in the funnel.",
        },
        {
          icon: "🌐",
          title: "Website that doesn't bring customers",
          description:
            "Your website is slow and doesn't convert. Even if someone finds you, they leave because the menu is hard to read or the loading is too slow.",
        },
      ],
    },
    socialProof: {
      stat: "200+",
      statLabel: "New online bookings in first month",
      testimonial:
        "Our restaurant went from 0 online bookings to over 200 in just one month. The Google ranking change was the turning point for our business.",
      clientName: "Bistro Dubai",
      clientRole: "Restaurant Owner, Dubai",
    },
    process: {
      title: "How we rank your restaurant",
      steps: [
        {
          number: "01",
          title: "Free SEO Audit & Strategy",
          description:
            "We analyze your current rankings, competitor data, and technical SEO. We provide a clear roadmap of exactly how we'll get you to page 1.",
        },
        {
          number: "02",
          title: "Local SEO & Menus",
          description:
            "We optimize your Google Business Profile, local citations, and on-page restaurant keywords. We ensure your menu is indexed and readable by Google.",
        },
        {
          number: "03",
          title: "Tables Start Filling Up",
          description:
            "Within 90 days, you rank for high-intent keywords like 'best pizza Dubai' or 'fine dining near me'. More organic traffic means more reservations and revenue.",
        },
      ],
    },
    faq: {
      items: [
        {
          question: "When will I see results?",
          answer:
            "Most restaurants see ranking improvements within 30 days and significant booking increases within 90 days. We focus on local SEO which brings the fastest ROI.",
        },
        {
          question: "Is this for all of UAE?",
          answer:
            "Yes! We cover Dubai, Abu Dhabi, Sharjah, and all other Emirates. Local SEO is highly effective for specific areas like Marina, Downtown, or JLT.",
        },
        {
          question: "Do you handle Google Business Profiles?",
          answer:
            "Yes, it's a core part of our service. We optimize your GBP for the 'Map Pack' where most local searches result in high-intent calls and visits.",
        },
      ],
    },
    finalCta: {
      headline: "Ready for more diners?",
      subHeadline:
        "Book your free 30-minute restaurant SEO audit. We'll show you exactly how to outrank your competitors.",
      formTitle: "Book Your Free Restaurant SEO Audit",
    },
    serviceType: "SEO - Restaurant",
  },

  "seo-for-clinics-uae": {
    slug: "seo-for-clinics-uae",
    title: "SEO for Clinics UAE | Rank for Patient Appointments",
    description:
      "We rank medical clinics in the UAE on Google page 1. Attract more patients, build trust, and grow your medical practice with expert SEO.",
    keywords: [
      "SEO for clinics Dubai",
      "medical SEO UAE",
      "healthcare digital marketing Dubai",
    ],
    heroImage: "/landing/hero-clinic.png",
    hero: {
      badge: "🩺 Medical SEO Specialists",
      headline: "Patients are searching for you. We make sure they find you.",
      subHeadline:
        "We rank UAE medical clinics on page 1 of Google within 90 days. Build trust with local patients and fill your calendar with appointments.",
      ctaText: "Get Your Free Clinic SEO Audit",
      ctaWhatsApp:
        "Hi, I manage a clinic in the UAE and I'm interested in SEO services. Can I book a free audit?",
      accentColor: "blue",
    },
    painPoints: {
      title: "Sound familiar?",
      items: [
        {
          icon: "🏥",
          title: "Patients choose competitors with more visibility",
          description:
            "Clinics with smaller practices outrank you simply because they have better Google presence. You're losing dozens of patients every month.",
        },
        {
          icon: "📉",
          title: "High spend on ads with low ROI",
          description:
            "Google Ads for medical keywords are expensive in the UAE. SEO provides a much lower cost-per-patient over the long term.",
        },
        {
          icon: "⭐",
          title: "Competitors have more reviews and visibility",
          description:
            "Newer clinics with fewer qualifications outrank you because they have better Google presence. It's frustrating and costing you patients daily.",
        },
      ],
    },
    socialProof: {
      stat: "400%",
      statLabel: "Increase in appointment bookings",
      testimonial:
        "From page 5 to #1 in local search results. The patient inquiry increase was dramatic; our reception was overwhelmed in the best way possible.",
      clientName: "HealthFirst Clinic",
      clientRole: "Multi-location Clinic, Dubai",
    },
    process: {
      title: "How we get your clinic on page 1",
      steps: [
        {
          number: "01",
          title: "Free Clinic SEO Audit",
          description:
            "We audit your website, Google Business Profile, local rankings, and competitor landscape. You'll see exactly why patients are finding your competitors instead of you.",
        },
        {
          number: "02",
          title: "DHA-Compliant SEO Strategy",
          description:
            "Medical-specific SEO including schema markup, local citations, review management, and content strategy, all compliant with UAE healthcare advertising regulations.",
        },
        {
          number: "03",
          title: "More Patients Book With You",
          description:
            "Within 90 days, your clinic ranks higher for patient-intent keywords. We track appointment bookings, phone calls, and website inquiries weekly.",
        },
      ],
    },
    faq: {
      items: [
        {
          question: "Is your SEO approach compliant with DHA/MOH regulations?",
          answer:
            "Absolutely. We're fully aware of UAE healthcare advertising regulations and ensure all content and metadata is compliant. We focus on informational, trust-building content that attracts patients ethically.",
        },
        {
          question: "How long until I see more patient bookings?",
          answer:
            "Most clinics see ranking improvements within 30-60 days and significant booking increases within 90 days. We specialize in local SEO which typically produces faster results than broad SEO.",
        },
        {
          question: "Do I need a new website, or can you work with my current one?",
          answer:
            "We can optimize your existing website. If it has major performance or design issues, we'll recommend improvements. We never upsell services you don't need.",
        },
      ],
    },
    finalCta: {
      headline: "Ready to get more patients?",
      subHeadline:
        "Book your free 30-minute clinic SEO audit. We'll show you exactly what's keeping patients from finding you online.",
      formTitle: "Book Your Free Clinic SEO Audit",
    },
    serviceType: "SEO - Medical Clinic",
  },

  "seo-for-real-estate-dubai": {
    slug: "seo-for-real-estate-dubai",
    title: "SEO for Real Estate Dubai | Rank for Property Buyers",
    description:
      "Dubai property buyers search Google 50,000+ times a month. Is your listing showing up? SEO for real estate developers, brokers & agencies in Dubai.",
    keywords: [
      "real estate SEO Dubai",
      "property website ranking UAE",
      "real estate digital marketing Dubai",
    ],
    heroImage: "/landing/hero-real-estate.png",
    hero: {
      badge: "🏘️ Real Estate SEO Specialists",
      headline:
        "Dubai property buyers search Google 50,000+ times a month. Is your listing showing up?",
      subHeadline:
        "SEO for real estate developers, brokers & agencies in Dubai. We put your properties in front of serious buyers who are actively searching right now.",
      ctaText: "Get Your Free Real Estate SEO Audit",
      ctaWhatsApp:
        "Hi, I'm in real estate in Dubai and I'm interested in SEO services. Can I book a free audit?",
      accentColor: "emerald",
    },
    painPoints: {
      title: "Sound familiar?",
      items: [
        {
          icon: "📉",
          title: "Your competitor's listings rank above yours",
          description:
            "You search 'buy apartment JVC Dubai' and a smaller developer shows up first. They're getting the buyer inquiries that should be yours.",
        },
        {
          icon: "💸",
          title: "Burning AED 10K+/month on ads with low-quality leads",
          description:
            "Portal ads (Bayut, Property Finder) eat your budget while organic search - the highest-intent channel - brings you nothing.",
        },
        {
          icon: "🌐",
          title: "Beautiful website, zero organic traffic",
          description:
            "Your site looks great but Google can't find it. No schema, slow loading, no keyword strategy. It's a digital brochure, not a lead machine.",
        },
      ],
    },
    socialProof: {
      stat: "300+",
      statLabel: "Qualified buyer leads in 60 days",
      testimonial:
        "42 qualified buyer leads in 21 days for a JVC developer. The SEO strategy finally made our website work harder than our sales team.",
      clientName: "Dubai Property Developer",
      clientRole: "Mid-size Developer, Dubai",
    },
    process: {
      title: "How we get your properties on page 1",
      steps: [
        {
          number: "01",
          title: "Free Real Estate SEO Audit",
          description:
            "We analyze your property listings, website structure, competitor rankings, and identify exactly which keyword gaps are costing you leads.",
        },
        {
          number: "02",
          title: "Property-Focused SEO Strategy",
          description:
            "Community pages, off-plan landing pages, schema markup for listings, and content that ranks for buyer-intent searches in specific Dubai areas.",
        },
        {
          number: "03",
          title: "Qualified Buyer Leads Come to You",
          description:
            "Within 90 days, your properties rank for high-intent searches. More inquiries from serious buyers, less wasted ad spend on portals.",
        },
      ],
    },
    faq: {
      items: [
        {
          question: "Can SEO compete with Bayut and Property Finder?",
          answer:
            "Your own website ranking on Google means buyers find YOU directly; no commission sharing and leads are exclusive to you. We target long-tail, community-specific keywords that portals often miss.",
        },
        {
          question: "How long until we see buyer leads from SEO?",
          answer:
            "Real estate SEO typically shows results in 60-90 days. Off-plan launches can see faster results with targeted paid search combined with SEO for long-term organic growth.",
        },
        {
          question: "Do you help with off-plan launch marketing?",
          answer:
            "Yes. We create dedicated landing pages for each off-plan project, optimized for Google Ads and organic search. This is where SEO and paid search work together for maximum lead volume.",
        },
      ],
    },
    finalCta: {
      headline: "Ready to dominate property search in Dubai?",
      subHeadline:
        "Book your free 30-minute real estate SEO audit. See exactly which keywords your competitors are ranking for and how to outrank them.",
      formTitle: "Book Your Free Real Estate SEO Audit",
    },
    serviceType: "SEO - Real Estate",
  },

  "restaurant-website-dubai": {
    slug: "restaurant-website-dubai",
    title: "Restaurant Website Design Dubai | Built to Take Bookings",
    description:
      "Mobile-first, fast-loading, SEO-ready restaurant websites for UAE F&B brands, built in 3 weeks. Online reservations 24/7.",
    keywords: [
      "restaurant website design Dubai",
      "F&B website UAE",
      "online menu website Dubai",
    ],
    heroImage: "/landing/hero-restaurant-web.png",
    hero: {
      badge: "🍽️ Restaurant Web Design",
      headline:
        "A restaurant website that takes bookings while you sleep, built in 3 weeks.",
      subHeadline:
        "Mobile-first, fast-loading, SEO-ready restaurant websites for UAE F&B brands. Online reservations, menu display, and Google ranking from day one.",
      ctaText: "Get a Free Quote for Your Restaurant Website",
      ctaWhatsApp:
        "Hi, I own a restaurant in Dubai and I need a new website. Can I get a free quote?",
      accentColor: "rose",
    },
    painPoints: {
      title: "Is your restaurant website doing this?",
      items: [
        {
          icon: "⏳",
          title: "Takes more than 4 seconds to load",
          description:
            "53% of mobile users leave before your website even opens. That's half your potential customers gone before they see your menu.",
        },
        {
          icon: "📵",
          title: "No online reservation button",
          description:
            "You're sending hungry people to Talabat and Zomato instead of your own system. They book there and you pay commission on every order.",
        },
        {
          icon: "🔍",
          title: "Google can't find it",
          description:
            "No SEO means no organic traffic. People searching 'restaurants near me' find your competitor instead. You're invisible to walk-in traffic.",
        },
      ],
    },
    socialProof: {
      stat: "200+",
      statLabel: "New bookings in month one after relaunch",
      testimonial:
        "The previous website was slow and had zero online booking. After the rebuild, we had 200+ new online bookings in the first month. Incredible turnaround.",
      clientName: "Dubai Restaurant Client",
      clientRole: "Multi-location F&B, Dubai",
    },
    process: {
      title: "How we build your restaurant website",
      steps: [
        {
          number: "01",
          title: "Free Discovery Call",
          description:
            "We talk about your restaurant, brand, and goals. We audit your current online presence and give you a clear scope, all free, no obligation.",
        },
        {
          number: "02",
          title: "We Build in 3 Weeks",
          description:
            "Mobile-first design, online reservation system, menu display, Google Maps integration, and on-page SEO, all delivered within 3 weeks.",
        },
        {
          number: "03",
          title: "You Start Getting Bookings",
          description:
            "Your new website goes live, immediately indexed by Google, and starts taking reservations 24/7. We track performance and report monthly.",
        },
      ],
    },
    faq: {
      items: [
        {
          question: "Can you integrate an online reservation system?",
          answer:
            "Yes. We integrate reservation systems directly into your website so customers can book tables 24/7 without needing Zomato or Talabat - and you keep 100% of the booking.",
        },
        {
          question: "Do you handle the menu and photography?",
          answer:
            "We design beautiful menu displays for your website. If you have existing food photography, we optimize it. If not, we can recommend trusted UAE food photographers.",
        },
        {
          question: "How much does a restaurant website cost?",
          answer:
            "Pricing depends on complexity, but our restaurant websites typically start from AED 5,000. We provide a clear, all-inclusive quote after the free discovery call - with no hidden fees.",
        },
      ],
    },
    finalCta: {
      headline: "Ready for a website that fills tables?",
      subHeadline:
        "Get a free quote for your restaurant website in 24 hours. Mobile-first, SEO-ready, built to convert - in just 3 weeks.",
      formTitle: "Get Your Free Restaurant Website Quote",
    },
    serviceType: "Web Development - Restaurant",
  },

  "clinic-website-design-uae": {
    slug: "clinic-website-design-uae",
    title: "Clinic Website Design UAE | Built for Patient Trust",
    description:
      "Professional clinic and hospital websites for UAE healthcare providers. Builds trust, ranks on Google & books patients 24/7.",
    keywords: [
      "clinic website design Dubai",
      "medical website UAE",
      "hospital website development",
    ],
    heroImage: "/landing/hero-clinic-web.png",
    hero: {
      badge: "🏥 Medical Web Design",
      headline:
        "A medical website that builds trust, ranks on Google & books patients 24/7.",
      subHeadline:
        "Professional clinic and hospital websites for UAE healthcare providers. DHA-compliant design, patient booking integration, and Google ranking from launch.",
      ctaText: "Get a Free Quote for Your Clinic Website",
      ctaWhatsApp:
        "Hi, I run a medical clinic in UAE and I need a professional website. Can I get a free quote?",
      accentColor: "indigo",
    },
    painPoints: {
      title: "Is your clinic website turning patients away?",
      items: [
        {
          icon: "🔒",
          title: "Doesn't build patient trust",
          description:
            "Patients research online before booking. If your website looks outdated or unprofessional, they'll choose the clinic with a polished, modern presence.",
        },
        {
          icon: "📅",
          title: "No online appointment booking",
          description:
            "Patients want to book at 11pm, not during your reception hours. Without online booking, you're losing appointments to clinics that offer it.",
        },
        {
          icon: "🛡️",
          title: "Not DHA/MOH compliant",
          description:
            "Healthcare advertising in the UAE has specific regulations. An improperly presented medical website can attract regulatory scrutiny.",
        },
      ],
    },
    socialProof: {
      stat: "300%",
      statLabel: "Patient inquiries up in 60 days",
      testimonial:
        "We built this Dubai clinic's website in 3 weeks. They got 47 new patient inquiries in month one. The Google ranking improvements were the real game changer.",
      clientName: "HealthFirst Clinic",
      clientRole: "Multi-specialty Clinic, Dubai",
    },
    process: {
      title: "How we build your clinic website",
      steps: [
        {
          number: "01",
          title: "Free Discovery Call",
          description:
            "We understand your specialties, patient demographics, and goals. We audit your current presence and provide a clear project scope, all free.",
        },
        {
          number: "02",
          title: "DHA-Compliant Design & Build",
          description:
            "Professional design that builds patient trust, online appointment booking, doctor profiles, service pages, all compliant with UAE healthcare regulations.",
        },
        {
          number: "03",
          title: "Patients Start Booking Online",
          description:
            "Your website goes live with built-in SEO, immediately indexed by Google. Patients find you, trust you, and book 24/7.",
        },
      ],
    },
    faq: {
      items: [
        {
          question:
            "Is the website design compliant with DHA/MOH regulations?",
          answer:
            "Yes. We understand UAE healthcare advertising regulations and ensure all content, imagery, and claims on your website are fully compliant.",
        },
        {
          question: "Can you integrate with our existing booking system?",
          answer:
            "Yes. We integrate with popular healthcare booking platforms, or we can build a custom booking module directly into your website.",
        },
        {
          question: "How much does a clinic website cost?",
          answer:
            "Medical websites typically start from AED 7,000 depending on complexity, number of specialties, and booking system requirements. We give you a fixed quote after the free call.",
        },
      ],
    },
    finalCta: {
      headline: "Ready for a website that books patients?",
      subHeadline:
        "Get a free quote for your clinic website in 24 hours. Professional, DHA-compliant, built to build patient trust and drive appointments.",
      formTitle: "Get Your Free Clinic Website Quote",
    },
    serviceType: "Web Development - Medical Clinic",
  },

  "ecommerce-website-dubai": {
    slug: "ecommerce-website-dubai",
    title: "E-Commerce Website Dubai | Built to Sell From Day One",
    description:
      "Launch your UAE online store in 4 weeks. Custom e-commerce development with Arabic support, UAE payment gateways & Google Shopping integration.",
    keywords: [
      "ecommerce website Dubai",
      "online store development UAE",
      "Shopify development Dubai",
    ],
    heroImage: "/landing/hero-ecommerce.png",
    hero: {
      badge: "🛒 E-Commerce Experts UAE",
      headline:
        "Launch your UAE online store in 4 weeks, built to sell from day one.",
      subHeadline:
        "Custom e-commerce development with Arabic support, UAE payment gateways & Google Shopping integration. From Shopify to fully custom builds.",
      ctaText: "Get a Free E-Commerce Website Quote",
      ctaWhatsApp:
        "Hi, I need an e-commerce website for my Dubai business. Can I get a free quote?",
      accentColor: "amber",
    },
    painPoints: {
      title: "Is your online store underperforming?",
      items: [
        {
          icon: "🛒",
          title: "Cart abandonment is killing your revenue",
          description:
            "UAE customers abandon carts when checkout is slow, payment options are limited, or the experience isn't mobile-friendly. You're losing sales at the finish line.",
        },
        {
          icon: "🌍",
          title: "No Arabic support or UAE payment gateways",
          description:
            "A huge portion of UAE shoppers prefer Arabic. Without proper localization and local payment options, you're excluding a massive market segment.",
        },
        {
          icon: "📊",
          title: "No Google Shopping or SEO visibility",
          description:
            "Your products aren't showing up in Google Shopping results or organic search. Competitors on Amazon and Noon are capturing all the traffic.",
        },
      ],
    },
    socialProof: {
      stat: "800%",
      statLabel: "Revenue return on AED 10K ad spend",
      testimonial:
        "We gave this Dubai brand AED 10k in ads. They made AED 80k back. The e-commerce platform they built for us was the foundation that made it possible.",
      clientName: "Dubai D2C Brand",
      clientRole: "E-commerce Retailer, UAE",
    },
    process: {
      title: "How we build your online store",
      steps: [
        {
          number: "01",
          title: "Free Discovery Call",
          description:
            "We understand your products, target market, and business goals. We audit your current setup and recommend the best platform and approach, all free.",
        },
        {
          number: "02",
          title: "We Build in 4 Weeks",
          description:
            "Full e-commerce setup: product catalog, payment gateways (UAE-specific), Arabic support, mobile optimization, and on-page SEO, delivered in 4 weeks.",
        },
        {
          number: "03",
          title: "You Start Selling Online",
          description:
            "Your store goes live with Google Shopping integration, Google Analytics, and conversion tracking. We provide 30 days of post-launch support.",
        },
      ],
    },
    faq: {
      items: [
        {
          question: "Do you build on Shopify or custom platforms?",
          answer:
            "We work with both. Shopify is great for fast launches and simpler catalogs. For complex requirements (custom Arabic RTL, unique checkout flows), we build fully custom solutions.",
        },
        {
          question: "Can you integrate UAE payment gateways?",
          answer:
            "Yes. We integrate with all major UAE payment processors including Telr, PayTabs, Network International, and Apple Pay / Google Pay for mobile checkout.",
        },
        {
          question: "Do you provide ongoing support after launch?",
          answer:
            "Every project includes 30 days of free post-launch support. After that, we offer optional monthly maintenance and growth packages.",
        },
      ],
    },
    finalCta: {
      headline: "Ready to start selling online?",
      subHeadline:
        "Get a free quote for your e-commerce website in 24 hours. UAE payment gateways, Arabic support, and Google Shopping, all included.",
      formTitle: "Get Your Free E-Commerce Website Quote",
    },
    serviceType: "Web Development - E-commerce",
  },
};

export function getLandingPageBySlug(
  slug: string
): LandingPageConfig | undefined {
  return LANDING_PAGES[slug];
}

export function getAllLandingPageSlugs(): string[] {
  return Object.keys(LANDING_PAGES);
}
