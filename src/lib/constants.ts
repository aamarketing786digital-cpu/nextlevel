import type {
  ClientLogo,
  NavLink,
  Service,
  CaseStudy,
  SocialLink,
  TeamMember,
  Testimonial,
} from "@/types";

// Navigation Links
export const NAVIGATION_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

// Social Media Links
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "twitter", url: "https://twitter.com/nextlevelmarketerz", icon: "twitter" },
  { platform: "linkedin", url: "https://linkedin.com/company/nextlevelmarketerz", icon: "linkedin" },
  { platform: "github", url: "https://github.com/nextlevelmarketerz", icon: "github" },
  { platform: "dribbble", url: "https://dribbble.com/nextlevelmarketerz", icon: "dribbble" },
] as const;

// Footer Links
export const FOOTER_LINKS = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/work", label: "Case Studies" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services/ai-chatbots", label: "AI Chatbots" },
    { href: "/services/web-development", label: "Web Development" },
    { href: "/services/digital-marketing", label: "Digital Marketing" },
    { href: "/services/graphic-design", label: "Graphic Design" },
    { href: "/services/seo", label: "SEO Services" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
} as const;

// Services Data
export const SERVICES: Service[] = [
  {
    id: "1",
    slug: "ai-chatbots",
    title: "AI Chatbots",
    icon: "bot",
    shortDescription: "Custom AI-powered chatbots for customer engagement and support automation.",
    description: "Transform your customer interactions with intelligent AI chatbots that understand context, provide instant responses, and learn from every conversation. Our chatbots integrate seamlessly with your existing systems and scale automatically to handle peak loads.",
    features: [
      "Natural Language Processing for human-like conversations",
      "Multi-language support including Arabic and English",
      "Analytics dashboard for conversation insights",
      "Seamless CRM and platform integrations",
      "24/7 automated customer support",
    ],
    technologies: ["OpenAI GPT", "LangChain", "Vector Databases", "React"],
    pricing: {
      name: "Custom Pricing",
      price: "Contact for pricing",
      deliverables: ["Custom chatbot development", "Training & documentation", "Ongoing support", "Analytics access"],
    },
  },
  {
    id: "2",
    slug: "web-development",
    title: "Web Development",
    icon: "code",
    shortDescription: "High-performance websites and web applications built with cutting-edge technologies.",
    description: "We build fast, scalable, and beautiful web experiences that drive results. From landing pages to complex web applications, our development team delivers solutions that exceed expectations.",
    features: [
      "Next.js 15+ for optimal performance",
      "Server-side rendering for SEO",
      "Progressive Web App capabilities",
      "Mobile-first responsive design",
      "TypeScript for type safety",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    pricing: {
      name: "Starting from",
      price: "$5,000",
      deliverables: ["Custom web development", "SEO optimization", "Performance tuning", "3 months support"],
    },
  },
  {
    id: "3",
    slug: "digital-marketing",
    title: "Digital Marketing",
    icon: "trending-up",
    shortDescription: "Data-driven marketing strategies that deliver measurable ROI and sustainable growth.",
    description: "Our digital marketing services combine creativity with analytics to deliver campaigns that convert. We focus on metrics that matter: leads, sales, and customer lifetime value.",
    features: [
      "Performance marketing across all channels",
      "Conversion rate optimization",
      "Marketing automation and email campaigns",
      "Social media management",
      "Detailed analytics and reporting",
    ],
    technologies: ["Google Ads", "Meta Ads", "HubSpot", "Google Analytics", "Mailchimp"],
    pricing: {
      name: "Monthly Retainer",
      price: "Starting from $2,500/month",
      deliverables: ["Campaign management", "Weekly reports", "Strategy calls", "Ad spend optimization"],
    },
  },
  {
    id: "4",
    slug: "graphic-design",
    title: "Graphic Design",
    icon: "palette",
    shortDescription: "Stunning visual identities and designs that capture your brand's essence.",
    description: "From logos to complete brand systems, our design team creates visuals that resonate with your audience. We believe great design is both beautiful and functional.",
    features: [
      "Logo design and brand identity",
      "Marketing collateral and social media graphics",
      "UI/UX design for web and mobile",
      "Print design and packaging",
      "Brand guidelines and style guides",
    ],
    technologies: ["Adobe Creative Suite", "Figma", "Illustrator", "Photoshop"],
    pricing: {
      name: "Project-based",
      price: "Starting from $1,500",
      deliverables: ["Source files", "Multiple formats", "Revisions", "Usage rights"],
    },
  },
  {
    id: "5",
    slug: "seo",
    title: "SEO Services",
    icon: "search",
    shortDescription: "Comprehensive SEO strategies to increase visibility and drive organic traffic.",
    description: "Our SEO services help your business rank higher and attract more qualified leads. We use white-hat techniques and focus on sustainable, long-term results.",
    features: [
      "Technical SEO audits and fixes",
      "Keyword research and content strategy",
      "On-page optimization",
      "Link building and outreach",
      "Local SEO for UAE/Middle East markets",
    ],
    technologies: ["Google Search Console", "SEMrush", "Ahrefs", "Screaming Frog"],
    pricing: {
      name: "Monthly Retainer",
      price: "Starting from $2,000/month",
      deliverables: ["Monthly reports", "Keyword tracking", "Content recommendations", "Technical fixes"],
    },
  },
] as const;

// Case Studies Data
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "1",
    title: "E-Commerce Transformation",
    client: "Luxury Fashion Brand",
    thumbnail: {
      src: "/images/case-studies/fashion-ecommerce.jpg",
      alt: "Fashion e-commerce website",
      width: 800,
      height: 600,
    },
    challenge: "A Dubai-based luxury fashion brand was struggling with low online sales and poor mobile experience. Their existing website had slow load times and complicated checkout process.",
    solution: "We rebuilt their e-commerce platform using Next.js 15 with server-side rendering, implemented progressive web app features, and optimized the checkout flow. Added Arabic language support and integrated local payment gateways.",
    results: "300% increase in mobile conversions, 65% faster page load times, 45% increase in average order value, and successful expansion to Saudi Arabia market.",
    tags: ["Web Development", "E-commerce"],
    year: 2024,
    featured: true,
  },
  {
    id: "2",
    title: "AI Customer Support Revolution",
    client: "Telecom Company",
    thumbnail: {
      src: "/images/case-studies/telecom-ai.jpg",
      alt: "AI chatbot interface",
      width: 800,
      height: 600,
    },
    challenge: "A major telecom company in UAE was facing high customer support costs and long wait times. Their support team was overwhelmed with repetitive inquiries.",
    solution: "Implemented an AI-powered chatbot using OpenAI GPT that handles 80% of customer inquiries automatically. Integrated with their CRM system and trained on their product knowledge base.",
    results: "70% reduction in support costs, 90% customer satisfaction with bot interactions, 24/7 support availability, and human agents now focus on complex issues only.",
    tags: ["AI & Automation", "Digital Marketing"],
    year: 2024,
    featured: true,
  },
  {
    id: "3",
    title: "Brand Identity Launch",
    client: "FinTech Startup",
    thumbnail: {
      src: "/images/case-studies/fintech-brand.jpg",
      alt: "Brand identity design",
      width: 800,
      height: 600,
    },
    challenge: "A new fintech startup needed a complete brand identity that would build trust in the competitive financial sector while appealing to a younger, tech-savvy audience.",
    solution: "Created a modern brand identity with a focus on trust, innovation, and accessibility. Designed logo, color system, typography, and comprehensive brand guidelines. Applied across all touchpoints.",
    results: "Successful launch with 40% brand recall within 3 months, $5M seed funding raised, featured in major tech publications, and social media following grew to 50K+.",
    tags: ["Brand Identity", "Digital Marketing"],
    year: 2023,
  },
  {
    id: "4",
    title: "SEO Domination Strategy",
    client: "Real Estate Portal",
    thumbnail: {
      src: "/images/case-studies/real-estate-seo.jpg",
      alt: "SEO analytics dashboard",
      width: 800,
      height: 600,
    },
    challenge: "A real estate portal was losing market share to competitors and had very low organic visibility. Their target keywords were dominated by established players.",
    solution: "Implemented comprehensive SEO strategy including technical fixes, content optimization, link building campaign, and local SEO focus. Created city-specific landing pages and optimized for featured snippets.",
    results: "500% increase in organic traffic, 150+ first page rankings, 60% increase in qualified leads, and 35% reduction in customer acquisition cost.",
    tags: ["SEO", "Web Development"],
    year: 2024,
  },
] as const;

// Team Members Data
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Al-Hassan",
    role: "Founder & CEO",
    bio: "Visionary leader with 15+ years in digital marketing and technology. Previously led marketing at Fortune 500 companies across MENA region.",
    headshot: {
      src: "/images/team/sarah.jpg",
      alt: "Sarah Al-Hassan",
      width: 400,
      height: 400,
    },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/sarah", icon: "linkedin" },
      { platform: "twitter", url: "https://twitter.com/sarah", icon: "twitter" },
    ],
    order: 1,
  },
  {
    id: "2",
    name: "Ahmed Khalil",
    role: "CTO",
    bio: "Full-stack architect and AI specialist. Former engineer at Google with expertise in scalable systems and machine learning integration.",
    headshot: {
      src: "/images/team/ahmed.jpg",
      alt: "Ahmed Khalil",
      width: 400,
      height: 400,
    },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/ahmed", icon: "linkedin" },
      { platform: "github", url: "https://github.com/ahmed", icon: "github" },
    ],
    order: 2,
  },
  {
    id: "3",
    name: "Layla Rahman",
    role: "Creative Director",
    bio: "Award-winning designer with portfolio spanning luxury brands, tech startups, and everything in between. Passionate about meaningful design.",
    headshot: {
      src: "/images/team/layla.jpg",
      alt: "Layla Rahman",
      width: 400,
      height: 400,
    },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/layla", icon: "linkedin" },
      { platform: "dribbble", url: "https://dribbble.com/layla", icon: "dribbble" },
      { platform: "behance", url: "https://behance.net/layla", icon: "behance" },
    ],
    order: 3,
  },
  {
    id: "4",
    name: "Omar Farooq",
    role: "Head of Growth",
    bio: "Data-driven marketer who has scaled startups from 0 to millions in revenue. Expert in performance marketing and conversion optimization.",
    headshot: {
      src: "/images/team/omar.jpg",
      alt: "Omar Farooq",
      width: 400,
      height: 400,
    },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/omar", icon: "linkedin" },
      { platform: "twitter", url: "https://twitter.com/omar", icon: "twitter" },
    ],
    order: 4,
  },
] as const;

// Client Logos (placeholders with company names for text-based display)
export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "TechVentures", src: "", alt: "TechVentures logo", href: "#" },
  { name: "InnovateCorp", src: "", alt: "InnovateCorp logo", href: "#" },
  { name: "GlobalReach", src: "", alt: "GlobalReach logo", href: "#" },
  { name: "DigitalEdge", src: "", alt: "DigitalEdge logo", href: "#" },
  { name: "FutureScale", src: "", alt: "FutureScale logo", href: "#" },
  { name: "PrimeDigital", src: "", alt: "PrimeDigital logo", href: "#" },
  { name: "NexaGrowth", src: "", alt: "NexaGrowth logo", href: "#" },
  { name: "ApexMedia", src: "", alt: "ApexMedia logo", href: "#" },
] as const;

// Testimonials data
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "NextLevel transformed our digital presence completely. Their AI chatbot solution reduced our response time by 80% and increased customer satisfaction scores significantly.",
    name: "Sarah Al-Mansoori",
    role: "CEO",
    company: "TechVentures UAE",
  },
  {
    quote: "The web development team delivered a stunning e-commerce platform that exceeded our expectations. Sales have increased by 150% since launch. Truly exceptional work!",
    name: "Ahmed Hassan",
    role: "Marketing Director",
    company: "Global Retail Group",
  },
  {
    quote: "Their digital marketing expertise helped us reach new markets across the GCC region. ROI on our campaigns has been outstanding. Highly recommend their services.",
    name: "Fatima Rahman",
    role: "Founder",
    company: "Style Collective",
  },
  {
    quote: "Professional, creative, and results-driven. The branding work NextLevel did for us perfectly captures our vision and resonates with our target audience.",
    name: "Omar Khalil",
    role: "Operations Manager",
    company: "Prime Estates",
  },
];

// Service Interest Options for Contact Form
export const SERVICE_INTEREST_OPTIONS = [
  { value: "ai-chatbots", label: "AI Chatbots" },
  { value: "web-dev", label: "Web Development" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "graphic-design", label: "Graphic Design" },
  { value: "seo", label: "SEO Services" },
] as const;

// Budget Range Options for Contact Form
export const BUDGET_RANGE_OPTIONS = [
  { value: "<5k", label: "Less than $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k+", label: "$50,000+" },
] as const;

// Hero Scene Configuration
export const HERO_SCENE_CONFIG = {
  rings: [
    { radius: 2, tube: 0.05, segments: 64, color: "#c9a227" }, // Gold
    { radius: 2.5, tube: 0.03, segments: 64, color: "#d4af37" }, // Lighter Gold
    { radius: 3, tube: 0.02, segments: 64, color: "#bf953f" }, // Bronze
  ],
  animationSpeed: 0.001, // Radians per frame
  floatingAmplitude: 0.5, // Vertical movement
  material: {
    metalness: 0.8,
    roughness: 0.2,
  },
} as const;
