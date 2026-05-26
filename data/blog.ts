/**
 * Serena Spa — Blog data
 * MVP: static data. Phase 9: migrate to Sanity CMS.
 * Per CONTENT_CHECKLIST.md: 10 initial blog topics.
 */

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string; // ISO date string
  readingTime: number; // in minutes
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b-01",
    slug: "best-spa-treatments-hoi-an-guide",
    title: "The Complete Guide to Spa Treatments in Hội An",
    excerpt:
      "From traditional Vietnamese massage to modern wellness rituals, discover the full spectrum of healing experiences Hội An has to offer — and why Serena Spa stands apart.",
    coverImage: "/images/blog/spa-treatments-guide.jpg",
    category: "Wellness Guide",
    tags: ["spa hoi an", "massage hoi an", "wellness", "guide"],
    publishedAt: "2026-05-01",
    readingTime: 6,
    isFeatured: true,
    seoTitle: "Best Spa Treatments in Hội An — Complete Wellness Guide",
    seoDescription:
      "Discover the best spa treatments and massage therapies available in Hội An, Vietnam. A complete guide to traditional and luxury wellness experiences.",
  },
  {
    id: "b-02",
    slug: "benefits-hot-stone-massage",
    title: "5 Profound Benefits of Hot Stone Massage You Should Know",
    excerpt:
      "Ancient volcanic stone meets modern wellness science. Discover how hot stone therapy reaches deeper than traditional massage and why it's become our guests' favourite treatment.",
    coverImage: "/images/blog/hot-stone-benefits.jpg",
    category: "Treatment Guides",
    tags: ["hot stone massage", "massage benefits", "wellness"],
    publishedAt: "2026-04-18",
    readingTime: 5,
    isFeatured: true,
    seoTitle: "Benefits of Hot Stone Massage — What to Expect | Serena Spa",
    seoDescription:
      "Learn about the profound health benefits of hot stone massage therapy, from deep muscle relief to mental clarity. Available at Serena Spa Hội An.",
  },
  {
    id: "b-03",
    slug: "couple-massage-hoi-an-guide",
    title: "Couple Massage in Hội An: The Perfect Romantic Experience",
    excerpt:
      "Planning a romantic getaway to Hội An? Learn why a couples wellness retreat is the most memorable way to connect — and how to plan the perfect spa day for two.",
    coverImage: "/images/blog/couple-massage-hoian.jpg",
    category: "Experiences",
    tags: ["couple massage hoi an", "romantic hoi an", "couples spa"],
    publishedAt: "2026-04-05",
    readingTime: 4,
    isFeatured: true,
    seoTitle: "Couple Massage in Hội An — Romantic Spa Experiences",
    seoDescription:
      "Plan the perfect couples spa experience in Hội An. Private suites, dual treatments, and intimate wellness rituals for two at Serena Spa.",
  },
  {
    id: "b-04",
    slug: "traditional-vietnamese-massage-techniques",
    title: "The Art of Vietnamese Massage: Ancient Techniques, Modern Healing",
    excerpt:
      "Vietnam has one of the world's richest massage traditions, rooted in centuries of folk medicine and energy philosophy. Explore the techniques behind our signature treatments.",
    coverImage: "/images/blog/vietnamese-massage.jpg",
    category: "Wellness Education",
    tags: ["vietnamese massage", "traditional massage", "healing"],
    publishedAt: "2026-03-22",
    readingTime: 7,
    isFeatured: false,
  },
  {
    id: "b-05",
    slug: "japandi-wellness-design-serenity",
    title: "Why Japandi Wellness Design Creates Deeper Healing",
    excerpt:
      "The fusion of Japanese minimalism and Scandinavian warmth creates spaces where healing happens naturally. Discover the design philosophy behind Serena Spa.",
    coverImage: "/images/blog/japandi-wellness.jpg",
    category: "Spa Culture",
    tags: ["japandi", "wellness design", "spa design", "serenity"],
    publishedAt: "2026-03-08",
    readingTime: 5,
    isFeatured: false,
  },
];

export function getFeaturedPosts(limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.isFeatured).slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
