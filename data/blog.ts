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

type LocalizedPostOverride = Partial<
  Pick<BlogPost, "title" | "excerpt" | "category" | "seoTitle" | "seoDescription">
>;

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
    title: "5 Profound Benefits of Himalayan Salt Stone Massage You Should Know",
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
    title: "The Serena Spa Culture: Healing Body, Mind, Spirit",
    excerpt:
      "Serena Spa’s culture stands out through its combination of healing the body, mind, and spirit, its close connection to nature, and a retreat-like relaxation experience rather than simply offering beauty treatments.",
    coverImage: "/images/blog/japandi-wellness.jpg",
    category: "Spa Culture",
    tags: ["japandi", "wellness design", "spa design", "serenity"],
    publishedAt: "2026-03-08",
    readingTime: 5,
    isFeatured: false,
  },
];

const BLOG_POSTS_VI: Record<string, LocalizedPostOverride> = {
  "b-01": {
    title: "Cẩm Nang Đầy Đủ Về Liệu Trình Spa Ở Hội An",
    excerpt:
      "Từ massage truyền thống Việt Nam đến các nghi thức wellness hiện đại, khám phá trọn vẹn hành trình phục hồi tại Hội An và lý do Serena Spa luôn khác biệt.",
    category: "Cẩm nang wellness",
    seoTitle: "Liệu Trình Spa Tốt Nhất Ở Hội An — Cẩm Nang Toàn Diện",
    seoDescription:
      "Khám phá các liệu trình spa và massage nổi bật tại Hội An, từ truyền thống đến cao cấp, trong cẩm nang đầy đủ của Serena Spa.",
  },
  "b-02": {
    title: "5 lợi ích tuyệt vời của massage đá muối Himalaya mà bạn nên biết",
    excerpt:
      "Đá núi lửa cổ xưa kết hợp khoa học wellness hiện đại. Tìm hiểu vì sao liệu pháp đá nóng đi sâu hơn massage thông thường và luôn được khách yêu thích.",
    category: "Hướng dẫn liệu trình",
    seoTitle: "Lợi Ích Massage Đá Nóng — Điều Bạn Cần Biết | Serena Spa",
    seoDescription:
      "Tìm hiểu lợi ích nổi bật của massage đá nóng, từ giảm đau cơ sâu đến thư giãn tinh thần, tại Serena Spa Hội An.",
  },
  "b-03": {
    title: "Massage Cặp Đôi Ở Hội An: Trải Nghiệm Lãng Mạn Hoàn Hảo",
    excerpt:
      "Đang lên kế hoạch nghỉ dưỡng lãng mạn ở Hội An? Khám phá vì sao retreat wellness cho cặp đôi là trải nghiệm đáng nhớ nhất và cách chuẩn bị một ngày spa hoàn hảo.",
    category: "Trải nghiệm",
    seoTitle: "Massage Cặp Đôi Ở Hội An — Trải Nghiệm Spa Lãng Mạn",
    seoDescription:
      "Lên kế hoạch cho trải nghiệm spa cặp đôi trọn vẹn tại Hội An với phòng riêng, liệu trình đôi và nghi thức thư giãn tinh tế.",
  },
  "b-04": {
    title: "Nghệ Thuật Massage Việt: Kỹ Thuật Cổ Truyền, Chữa Lành Hiện Đại",
    excerpt:
      "Việt Nam sở hữu một trong những truyền thống massage phong phú nhất, bắt nguồn từ y học dân gian và triết lý năng lượng qua nhiều thế kỷ.",
    category: "Kiến thức wellness",
  },
  "b-05": {
    title: "Vì Sao Phong Cách Japandi Giúp Chữa Lành Sâu Hơn",
    excerpt:
      "Văn hóa Serena Spa nổi bật nhờ sự kết hợp giữa chữa lành thân - tâm - trí, kết nối sâu với thiên nhiên và trải nghiệm thư giãn như một retreat, thay vì chỉ dừng ở các liệu trình làm đẹp.",
    category: "Văn hoá spa",
  },
};

function localizePost(post: BlogPost, locale: "vi" | "en"): BlogPost {
  if (locale === "en") return post;
  return { ...post, ...(BLOG_POSTS_VI[post.id] ?? {}) };
}

export function getFeaturedPosts(limit = 3, locale: "vi" | "en" = "en"): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.isFeatured)
    .slice(0, limit)
    .map((post) => localizePost(post, locale));
}

export function getPostBySlug(slug: string, locale: "vi" | "en" = "en"): BlogPost | undefined {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  return post ? localizePost(post, locale) : undefined;
}

export function getAllPosts(locale: "vi" | "en" = "en"): BlogPost[] {
  return BLOG_POSTS.map((post) => localizePost(post, locale));
}
