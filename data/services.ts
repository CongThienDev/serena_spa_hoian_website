/**
 * Serena Spa — Services data
 * MVP: static data file. Phase 9: migrate to Sanity CMS.
 * Per CONTENT_CHECKLIST.md suggested categories and treatments.
 */

export type ServiceCategory = {
  id: string;
  label: string;
  slug: string;
  description: string;
};

export type Service = {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  tagline: string;
  description: string;
  duration: number[]; // in minutes — multiple options
  price: number;      // base price in USD
  priceVND?: number;  // price in VND
  image: string;      // path relative to /public
  gallery?: string[];
  benefits?: string[];
  includes?: string[];
  addOns?: string[];
  isSignature?: boolean;
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

type LocalizedServiceOverride = Partial<
  Pick<
    Service,
    "name" | "tagline" | "description" | "benefits" | "includes" | "seoTitle" | "seoDescription"
  >
>;

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "massage",
    label: "Massage Therapy",
    slug: "massage",
    description:
      "Restore balance and release tension with our signature massage therapies, blending ancient Vietnamese techniques with modern wellness.",
  },
  {
    id: "facial",
    label: "Facial Treatments",
    slug: "facial",
    description:
      "Reveal your natural radiance with our nourishing facial treatments, using botanical ingredients and holistic skincare rituals.",
  },
  {
    id: "body",
    label: "Body Treatments",
    slug: "body",
    description:
      "Indulge in full-body rituals designed to cleanse, nourish, and revitalise from head to toe.",
  },
  {
    id: "couple",
    label: "Couple Packages",
    slug: "couple",
    description:
      "Share the gift of wellness with a loved one. Our couple treatments create moments of deep connection and shared serenity.",
  },
];

export const SERVICES: Service[] = [
  {
    id: "serena-signature-massage",
    slug: "serena-signature-massage",
    categoryId: "massage",
    name: "Serena Signature Massage",
    tagline: "Our most beloved treatment",
    description:
      "A journey of deep restoration. Our signature blend of Swedish and Vietnamese techniques melts tension from head to toe, leaving you in a state of profound calm. Warm herbal compresses, fragrant oils, and intuitive pressure work in harmony to restore your body's natural balance.",
    duration: [60, 90, 120],
    price: 35,
    priceVND: 850000,
    image: "/images/serena_image/z7863130176379_c5ca367025c871384fcc1d77b7468dc8.jpg",
    gallery: [
      "/images/serena_image/z7863130373074_bd43471af11ebd6a27da4edc71b541b6.jpg",
      "/images/serena_image/z7863130399936_a16c4518ce69d94cc60728eb569ee3ae.jpg",
    ],
    benefits: [
      "Deep muscle tension release",
      "Improved circulation and lymphatic flow",
      "Reduced stress and anxiety",
      "Enhanced sleep quality",
      "Restored energy and vitality",
    ],
    includes: [
      "Welcome herbal foot soak",
      "Full body massage",
      "Hot herbal compress application",
      "Scalp and neck treatment",
      "Herbal tea ceremony",
    ],
    isSignature: true,
    isFeatured: true,
    seoTitle: "Serena Signature Massage — Full Body Treatment in Hội An",
    seoDescription:
      "Experience our signature full body massage in Hội An, blending Swedish and Vietnamese techniques with warm herbal compresses. Book from $35.",
  },
  {
    id: "facial-clay-therapy",
    slug: "facial-clay-therapy",
    categoryId: "facial",
    name: "Facial Clay Therapy",
    tagline: "Deep cleanse, natural glow",
    description:
      "A purifying ritual using mineral-rich clay and botanical extracts to deeply cleanse pores, balance oil production, and reveal fresh, luminous skin. Suitable for all skin types.",
    duration: [60, 90],
    price: 30,
    priceVND: 730000,
    image: "/images/serena_image/z7863130203764_6bc950cfa0128b88f9da0f0e14fc8264.jpg",
    benefits: [
      "Deep pore cleansing",
      "Balanced oil production",
      "Improved skin texture",
      "Natural radiance enhancement",
    ],
    isSignature: false,
    isFeatured: true,
  },
  {
    id: "hot-stone-therapy",
    slug: "hot-stone-therapy",
    categoryId: "massage",
    name: "Hot Stone Therapy",
    tagline: "Ancient warmth, modern healing",
    description:
      "Smooth, sun-warmed basalt stones glide over muscles in long, flowing strokes — penetrating deeper than hands alone. The gentle heat melts chronic tension and quiets an overactive mind.",
    duration: [75, 90],
    price: 40,
    priceVND: 970000,
    image: "/images/serena_image/z7863130373074_bd43471af11ebd6a27da4edc71b541b6.jpg",
    benefits: [
      "Deep muscle penetration",
      "Chronic tension relief",
      "Improved blood circulation",
      "Mental clarity and calm",
    ],
    isSignature: false,
    isFeatured: true,
  },
  {
    id: "foot-massage",
    slug: "foot-massage",
    categoryId: "massage",
    name: "Foot Massage",
    tagline: "Ground yourself, restore your step",
    description:
      "After long days exploring Hội An's ancient streets, our reflexology-based foot treatment releases fatigue, improves circulation, and restores balance through targeted pressure point therapy.",
    duration: [30, 45, 60],
    price: 18,
    priceVND: 440000,
    image: "/images/serena_image/z7863130080318_bd46759e1d082e30adb7e1b0a0e90bd0.jpg",
    benefits: [
      "Fatigue and swelling relief",
      "Improved circulation",
      "Reflexology pressure points",
      "Grounding and centering",
    ],
    isFeatured: true,
  },
  {
    id: "couple-ritual",
    slug: "couple-ritual",
    categoryId: "couple",
    name: "Couple Ritual",
    tagline: "Two souls, one sanctuary",
    description:
      "Share the deepest form of relaxation with someone you love. Side-by-side in our private couple suite, you'll journey together through a full body massage, facial ritual, and champagne toast — a memory woven in serenity.",
    duration: [120, 150],
    price: 80,
    priceVND: 1950000,
    image: "/images/serena_image/z7863130225920_fcbb5881c13f6f51fd437554d30283e4.jpg",
    gallery: [
      "/images/serena_image/z7863130176379_c5ca367025c871384fcc1d77b7468dc8.jpg",
    ],
    benefits: [
      "Shared wellness experience",
      "Private couple suite",
      "Simultaneous treatments",
      "Deepen your connection",
    ],
    includes: [
      "Private couple treatment room",
      "Dual full body massage",
      "Dual facial treatment",
      "Champagne or herbal welcome drink",
      "Chocolate and seasonal fruits",
    ],
    isSignature: true,
    isFeatured: true,
    seoTitle: "Couple Massage Hội An — Romantic Wellness Package",
    seoDescription:
      "Book a romantic couple massage in Hội An at Serena Spa. Private suite, dual treatments, and champagne toast from $80. Perfect for anniversaries.",
  },
  {
    id: "body-scrub-ritual",
    slug: "body-scrub-ritual",
    categoryId: "body",
    name: "Body Scrub Ritual",
    tagline: "Renew. Reveal. Radiate.",
    description:
      "A full-body exfoliation ritual using natural sea salt, coffee, or turmeric scrub — chosen to your skin's needs. Removes dead cells, boosts circulation, and leaves skin impossibly soft and glowing.",
    duration: [45, 60],
    price: 25,
    priceVND: 610000,
    image: "/images/serena_image/z7863130399936_a16c4518ce69d94cc60728eb569ee3ae.jpg",
    benefits: [
      "Dead skin cell removal",
      "Smoother, softer skin",
      "Boosted circulation",
      "Natural glow",
    ],
    isFeatured: false,
  },
];

const CATEGORY_LABELS_VI: Record<string, { label: string; description: string }> = {
  massage: {
    label: "Massage trị liệu",
    description: "Khôi phục cân bằng và giải phóng căng thẳng với các liệu pháp massage đặc trưng kết hợp kỹ thuật Việt Nam và hiện đại.",
  },
  facial: {
    label: "Chăm sóc da mặt",
    description: "Đánh thức vẻ rạng rỡ tự nhiên với các liệu trình facial giàu dưỡng chất thực vật và nghi thức chăm da toàn diện.",
  },
  body: {
    label: "Chăm sóc cơ thể",
    description: "Nghi thức toàn thân giúp làm sạch, nuôi dưỡng và tái tạo năng lượng từ đầu đến chân.",
  },
  couple: {
    label: "Gói cặp đôi",
    description: "Chia sẻ món quà wellness cùng người thương với những khoảnh khắc kết nối sâu và bình yên.",
  },
};

const SERVICES_VI: Record<string, LocalizedServiceOverride> = {
  "serena-signature-massage": {
    name: "Serena Signature Massage",
    tagline: "Liệu trình được yêu thích nhất",
    description:
      "Hành trình phục hồi sâu, kết hợp kỹ thuật Thụy Điển và Việt Nam để giải phóng căng cơ toàn thân. Túi thảo dược ấm, tinh dầu thơm và lực tay chuẩn xác giúp cơ thể trở về trạng thái cân bằng.",
    benefits: [
      "Giải phóng căng cơ sâu",
      "Cải thiện tuần hoàn và lưu thông bạch huyết",
      "Giảm stress và lo âu",
      "Ngủ sâu và ngon hơn",
      "Phục hồi năng lượng",
    ],
    includes: [
      "Ngâm chân thảo dược chào đón",
      "Massage toàn thân",
      "Chườm thảo dược nóng",
      "Chăm sóc da đầu và cổ vai gáy",
      "Trà thảo mộc sau liệu trình",
    ],
  },
  "facial-clay-therapy": {
    name: "Facial Clay Therapy",
    tagline: "Làm sạch sâu, sáng da tự nhiên",
    description:
      "Liệu trình thanh lọc với đất sét khoáng và chiết xuất thực vật giúp làm sạch sâu lỗ chân lông, cân bằng dầu và trả lại làn da tươi sáng.",
  },
  "hot-stone-therapy": {
    name: "Hot Stone Therapy",
    tagline: "Hơi ấm cổ truyền, chữa lành hiện đại",
    description:
      "Đá bazan ấm trượt dài theo cơ giúp tác động sâu hơn tay massage thông thường. Nhiệt ấm dịu tan căng cơ mạn tính và đưa tâm trí vào trạng thái tĩnh.",
  },
  "foot-massage": {
    name: "Foot Massage",
    tagline: "Vững vàng từng bước chân",
    description:
      "Sau những ngày dạo phố Hội An, liệu trình reflexology chân giúp giảm mỏi, cải thiện tuần hoàn và tái cân bằng năng lượng qua các huyệt đạo trọng điểm.",
  },
  "couple-ritual": {
    name: "Couple Ritual",
    tagline: "Hai tâm hồn, một chốn bình yên",
    description:
      "Trải nghiệm thư giãn sâu cùng người thương trong phòng đôi riêng tư, với massage toàn thân, facial và nghi thức nâng ly đầy tinh tế.",
  },
  "body-scrub-ritual": {
    name: "Body Scrub Ritual",
    tagline: "Làm mới. Rạng rỡ. Tỏa sáng.",
    description:
      "Nghi thức tẩy tế bào chết toàn thân bằng muối biển, cà phê hoặc nghệ theo nhu cầu da. Giúp da mịn màng, tăng tuần hoàn và sáng khỏe tự nhiên.",
  },
};

function localizeService(service: Service, locale: "vi" | "en"): Service {
  if (locale === "en") return service;
  return { ...service, ...(SERVICES_VI[service.id] ?? {}) };
}

export function getServiceCategories(locale: "vi" | "en" = "en"): ServiceCategory[] {
  if (locale === "en") return SERVICE_CATEGORIES;
  return SERVICE_CATEGORIES.map((cat) => ({
    ...cat,
    label: CATEGORY_LABELS_VI[cat.id]?.label ?? cat.label,
    description: CATEGORY_LABELS_VI[cat.id]?.description ?? cat.description,
  }));
}

/* ── Helper functions ───────────────────────────────────────────────────────
─────────────────────────────────────────────────────────────────────────── */

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServiceBySlugLocalized(
  slug: string,
  locale: "vi" | "en" = "en",
): Service | undefined {
  const service = SERVICES.find((s) => s.slug === slug);
  return service ? localizeService(service, locale) : undefined;
}

export function getServicesByCategory(categoryId: string): Service[] {
  return SERVICES.filter((s) => s.categoryId === categoryId);
}

export function getServicesByCategoryLocalized(
  categoryId: string,
  locale: "vi" | "en" = "en",
): Service[] {
  return SERVICES.filter((s) => s.categoryId === categoryId).map((service) =>
    localizeService(service, locale),
  );
}

export function getFeaturedServices(limit = 4): Service[] {
  return SERVICES.filter((s) => s.isFeatured).slice(0, limit);
}

export function getFeaturedServicesLocalized(
  limit = 4,
  locale: "vi" | "en" = "en",
): Service[] {
  return SERVICES.filter((s) => s.isFeatured)
    .slice(0, limit)
    .map((service) => localizeService(service, locale));
}

export function getAllServicesLocalized(
  locale: "vi" | "en" = "en",
): Service[] {
  return SERVICES.map((service) => localizeService(service, locale));
}

export function getSignatureServices(): Service[] {
  return SERVICES.filter((s) => s.isSignature);
}
