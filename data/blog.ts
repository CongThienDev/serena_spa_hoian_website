/**
 * Serena Spa — Blog data
 * MVP: static data. Phase 9: migrate to Sanity CMS.
 * Per CONTENT_CHECKLIST.md: 10 initial blog topics.
 */

import { type Locale } from "@/lib/i18n";

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

// 한국어 임시 번역 — 검토 후 다듬어 주세요 (Korean placeholder translations — please review/refine).
const BLOG_POSTS_KO: Record<string, LocalizedPostOverride> = {
  "b-01": {
    title: "호이안 스파 트리트먼트 완벽 가이드",
    excerpt:
      "전통 베트남 마사지부터 현대 웰니스 리추얼까지, 호이안이 선사하는 힐링 경험의 모든 것과 세레나 스파가 특별한 이유를 알아보세요.",
    category: "웰니스 가이드",
    seoTitle: "호이안 최고의 스파 트리트먼트 — 완벽 웰니스 가이드",
    seoDescription:
      "호이안에서 즐길 수 있는 최고의 스파와 마사지 트리트먼트를 전통부터 럭셔리까지 세레나 스파의 완벽 가이드로 만나보세요.",
  },
  "b-02": {
    title: "꼭 알아야 할 히말라야 소금돌 마사지의 5가지 효능",
    excerpt:
      "고대 화산석과 현대 웰니스 과학의 만남. 핫 스톤 테라피가 일반 마사지보다 더 깊이 작용하며 손님들이 가장 사랑하는 이유를 알아보세요.",
    category: "트리트먼트 가이드",
    seoTitle: "핫 스톤 마사지의 효능 — 기대할 수 있는 것 | 세레나 스파",
    seoDescription:
      "깊은 근육 이완부터 정신적 명료함까지, 핫 스톤 마사지의 뛰어난 효능을 호이안 세레나 스파에서 알아보세요.",
  },
  "b-03": {
    title: "호이안 커플 마사지: 완벽한 로맨틱 경험",
    excerpt:
      "호이안으로 로맨틱한 여행을 계획 중이신가요? 커플 웰니스 리트리트가 가장 기억에 남는 방법인 이유와 완벽한 둘만의 스파 데이를 계획하는 법을 알아보세요.",
    category: "경험",
    seoTitle: "호이안 커플 마사지 — 완벽한 로맨틱 스파 경험",
    seoDescription:
      "프라이빗 룸, 커플 트리트먼트, 섬세한 릴랙세이션 리추얼로 호이안에서 완벽한 커플 스파 경험을 계획하세요.",
  },
  "b-04": {
    title: "베트남 마사지의 예술: 전통 기법, 현대적 힐링",
    excerpt:
      "베트남은 수 세기에 걸친 민간 의학과 에너지 철학에 뿌리를 둔 가장 풍부한 마사지 전통 중 하나를 지니고 있습니다.",
    category: "웰니스 지식",
  },
  "b-05": {
    title: "자판디 디자인이 더 깊은 힐링을 선사하는 이유",
    excerpt:
      "세레나 스파의 문화는 몸·마음·정신의 힐링, 자연과의 깊은 연결, 단순한 뷰티 트리트먼트를 넘어선 리트리트 같은 이완 경험으로 돋보입니다.",
    category: "스파 문화",
  },
};

const POST_OVERRIDES: Partial<Record<Locale, Record<string, LocalizedPostOverride>>> = {
  vi: BLOG_POSTS_VI,
  ko: BLOG_POSTS_KO,
};

function localizePost(post: BlogPost, locale: Locale): BlogPost {
  const overrides = POST_OVERRIDES[locale];
  if (!overrides) return post;
  return { ...post, ...(overrides[post.id] ?? {}) };
}

export function getFeaturedPosts(limit = 3, locale: Locale = "en"): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.isFeatured)
    .slice(0, limit)
    .map((post) => localizePost(post, locale));
}

export function getPostBySlug(slug: string, locale: Locale = "en"): BlogPost | undefined {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  return post ? localizePost(post, locale) : undefined;
}

export function getAllPosts(locale: Locale = "en"): BlogPost[] {
  return BLOG_POSTS.map((post) => localizePost(post, locale));
}
