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
    id: "serena-glow-balance-couples",
    slug: "serena-glow-balance-couples",
    categoryId: "couple",
    name: "SERENA GLOW & BALANCE / COUPLES",
    tagline: "Glow Skin - Light Body - Peaceful Mind",
    description:
      "A luxurious 150-minute couples treatment designed to revitalize the body, brighten the skin, and harmonize mind and body together. All prices are listed in (.000) VND and include 5% service charge and VAT.",
    duration: [150],
    price: 100,
    priceVND: 2450000,
    image: "/images/serena_image/z7863130225920_fcbb5881c13f6f51fd437554d30283e4.jpg",
    benefits: [
      "Revitalizes body energy and overall balance",
      "Brightens and refreshes skin tone",
      "Relieves muscle tension and stress",
      "Supports holistic physical and mental wellness",
    ],
    includes: [
      "30 minutes exfoliating scrub or nourishing body wrap to remove dead skin cells, detoxify, and prepare the skin for deeper treatments",
      "60 minutes Swedish body massage to relax muscles, improve circulation, and release tension",
      "60 minutes rejuvenating facial treatment to hydrate, brighten, and refresh the complexion",
    ],
    isSignature: true,
    isFeatured: true,
    seoTitle: "Serena Glow & Balance Couples Package | Serena Spa Hội An",
    seoDescription:
      "Discover the 150-minute Serena Glow & Balance couples package with scrub or body wrap, Swedish massage, and rejuvenating facial at Serena Spa Hội An.",
  },
  {
    id: "serena-signature-3-days-long-stay-couple",
    slug: "serena-signature-3-days-long-stay-couple",
    categoryId: "couple",
    name: "SERENA SIGNATURE 3 DAYS",
    tagline: "3-Day Serenity Experience",
    description:
      "A 3-day signature wellness package designed for long-stay guests seeking relaxation, rejuvenation, and shared experiences. Perfect for couples or any guests staying 3-4 nights in Hoi An.",
    duration: [90],
    price: 220,
    priceVND: 5400000,
    image: "/images/serena_image/z7863130176379_c5ca367025c871384fcc1d77b7468dc8.jpg",
    benefits: [
      "Sustained relaxation and rejuvenation across 3 consecutive days",
      "Shared wellness journey for couples and long-stay guests",
      "Flexible treatment selection from spa services each day",
      "Healthy post-treatment nourishment and special take-home gift",
    ],
    includes: [
      "3 days of wellness treatments, 90 minutes each day, selectable from any spa service",
      "For 2 guests per day / per stay, allowing couples to enjoy treatments together",
      "Healthy juice and Yogurt Granola provided after each treatment daily",
      "Applicable to all guests staying 3-4 nights in Hoi An",
      "Special gift included to take home for each guest using this package",
    ],
    isSignature: true,
    isFeatured: true,
    seoTitle: "Serena Signature 3-Day Long-Stay Couple Package | Serena Spa Hội An",
    seoDescription:
      "Explore Serena Spa's 3-day signature package for long-stay couples in Hoi An, including daily 90-minute treatments, healthy refreshments, and special gifts.",
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

const HIDDEN_SERVICE_SLUGS = new Set<string>([
  "couple-ritual",
]);

function isVisibleService(service: Service): boolean {
  return !HIDDEN_SERVICE_SLUGS.has(service.slug);
}

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
    benefits: [
      "Làm sạch sâu lỗ chân lông",
      "Cân bằng tiết dầu",
      "Cải thiện bề mặt da",
      "Tăng độ rạng rỡ tự nhiên",
    ],
    includes: [
      "Làm sạch và tẩy tế bào chết dịu nhẹ",
      "Đắp mặt nạ đất sét khoáng",
      "Massage mặt thư giãn",
      "Dưỡng ẩm phục hồi",
    ],
  },
  "hot-stone-therapy": {
    name: "Hot Stone Therapy",
    tagline: "Hơi ấm cổ truyền, chữa lành hiện đại",
    description:
      "Đá bazan ấm trượt dài theo cơ giúp tác động sâu hơn tay massage thông thường. Nhiệt ấm dịu tan căng cơ mạn tính và đưa tâm trí vào trạng thái tĩnh.",
    benefits: [
      "Tác động sâu vào cơ",
      "Giảm căng cơ mạn tính",
      "Tăng tuần hoàn máu",
      "Làm dịu tâm trí",
    ],
    includes: [
      "Massage toàn thân với đá nóng",
      "Kỹ thuật day ấn chuyên sâu",
      "Tinh dầu thư giãn",
      "Khăn ấm sau liệu trình",
    ],
  },
  "foot-massage": {
    name: "Foot Massage",
    tagline: "Vững vàng từng bước chân",
    description:
      "Sau những ngày dạo phố Hội An, liệu trình reflexology chân giúp giảm mỏi, cải thiện tuần hoàn và tái cân bằng năng lượng qua các huyệt đạo trọng điểm.",
    benefits: [
      "Giảm mệt mỏi và sưng nề bàn chân",
      "Cải thiện tuần hoàn",
      "Kích hoạt huyệt đạo phản xạ",
      "Cảm giác vững vàng, thư thái",
    ],
    includes: [
      "Ngâm chân thảo dược",
      "Massage phản xạ bàn chân",
      "Thư giãn bắp chân",
      "Trà thảo mộc sau liệu trình",
    ],
  },
  "couple-ritual": {
    name: "Couple Ritual",
    tagline: "Hai tâm hồn, một chốn bình yên",
    description:
      "Trải nghiệm thư giãn sâu cùng người thương trong phòng đôi riêng tư, với massage toàn thân, facial và nghi thức nâng ly đầy tinh tế.",
    benefits: [
      "Trải nghiệm phục hồi cùng nhau",
      "Không gian phòng đôi riêng tư",
      "Liệu trình đồng thời cho hai người",
      "Tăng kết nối cảm xúc",
    ],
    includes: [
      "Phòng trị liệu cặp đôi riêng",
      "Massage toàn thân cho hai người",
      "Chăm sóc da mặt cho hai người",
      "Đồ uống chào mừng",
      "Trái cây theo mùa",
    ],
  },
  "serena-glow-balance-couples": {
    name: "SERENA GLOW & BALANCE / COUPLES",
    tagline: "GÓI SÁNG DA - NHẸ THÂN - TÂM AN",
    description:
      "Liệu trình chăm sóc cá nhân sang trọng 150 phút dành cho cặp đôi, được thiết kế để phục hồi sức sống cho cơ thể, làm sáng da và hài hòa tâm trí và cơ thể. Tất cả giá đều được tính bằng (.000) Việt Nam đồng, bao gồm 5% phí phục vụ và VAT.",
    benefits: [
      "Phục hồi năng lượng và cân bằng cơ thể",
      "Làm sáng và làm tươi mới làn da",
      "Giải phóng căng cơ, giảm áp lực tinh thần",
      "Hỗ trợ thư giãn sâu và chữa lành toàn diện",
    ],
    includes: [
      "30 phút tẩy tế bào chết hoặc đắp mặt nạ dưỡng thể để loại bỏ tế bào chết, thải độc và chuẩn bị da cho các liệu trình sâu hơn",
      "60 phút massage Thụy Điển toàn thân để thư giãn cơ bắp, cải thiện tuần hoàn và giải tỏa căng thẳng",
      "60 phút chăm sóc da mặt trẻ hóa để cấp ẩm, làm sáng và làm tươi mới làn da",
    ],
  },
  "serena-signature-3-days-long-stay-couple": {
    name: "SERENA SIGNATURE 3 DAYS",
    tagline: "GÓI TRẢI NGHIỆM AN YÊN 3 NGÀY",
    description:
      "Gói chăm sóc sức khỏe đặc biệt 3 ngày được thiết kế dành cho khách lưu trú dài ngày tìm kiếm sự thư giãn, trẻ hóa và những trải nghiệm cùng nhau. Hoàn hảo cho các cặp đôi hoặc bất kỳ khách nào lưu trú từ 3-4 đêm tại Hội An.",
    benefits: [
      "Thư giãn sâu và phục hồi đều đặn trong 3 ngày liên tiếp",
      "Trải nghiệm chăm sóc sức khỏe đồng hành dành cho cặp đôi",
      "Linh hoạt lựa chọn dịch vụ spa mỗi ngày theo nhu cầu",
      "Bổ sung dinh dưỡng sau trị liệu và quà tặng mang về",
    ],
    includes: [
      "3 ngày trị liệu chăm sóc sức khỏe, mỗi ngày 90 phút, có thể lựa chọn bất kỳ dịch vụ spa nào",
      "Dành cho 2 khách mỗi ngày/mỗi lần lưu trú, cho phép các cặp đôi cùng nhau tận hưởng các liệu trình",
      "Nước ép trái cây tốt cho sức khỏe và sữa chua granola được cung cấp sau mỗi liệu trình hàng ngày",
      "Áp dụng cho tất cả khách lưu trú từ 3-4 đêm tại Hội An",
      "Quà tặng đặc biệt được tặng kèm cho mỗi khách sử dụng gói dịch vụ này",
    ],
  },
  "body-scrub-ritual": {
    name: "Body Scrub Ritual",
    tagline: "Làm mới. Rạng rỡ. Tỏa sáng.",
    description:
      "Nghi thức tẩy tế bào chết toàn thân bằng muối biển, cà phê hoặc nghệ theo nhu cầu da. Giúp da mịn màng, tăng tuần hoàn và sáng khỏe tự nhiên.",
    benefits: [
      "Loại bỏ tế bào chết",
      "Da mịn và mềm hơn",
      "Tăng tuần hoàn",
      "Làn da sáng khỏe tự nhiên",
    ],
    includes: [
      "Tẩy tế bào chết toàn thân",
      "Làm sạch và ủ dưỡng",
      "Dưỡng ẩm toàn thân",
      "Trà thảo mộc thư giãn",
    ],
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
  return SERVICES.find((s) => s.slug === slug && isVisibleService(s));
}

export function getServiceBySlugLocalized(
  slug: string,
  locale: "vi" | "en" = "en",
): Service | undefined {
  const service = SERVICES.find((s) => s.slug === slug && isVisibleService(s));
  return service ? localizeService(service, locale) : undefined;
}

export function getServicesByCategory(categoryId: string): Service[] {
  return SERVICES.filter((s) => s.categoryId === categoryId && isVisibleService(s));
}

export function getServicesByCategoryLocalized(
  categoryId: string,
  locale: "vi" | "en" = "en",
): Service[] {
  return SERVICES.filter((s) => s.categoryId === categoryId && isVisibleService(s))
    .map((service) => localizeService(service, locale));
}

export function getFeaturedServices(limit = 4): Service[] {
  return SERVICES.filter((s) => s.isFeatured && isVisibleService(s)).slice(0, limit);
}

export function getFeaturedServicesLocalized(
  limit = 4,
  locale: "vi" | "en" = "en",
): Service[] {
  return SERVICES.filter((s) => s.isFeatured && isVisibleService(s))
    .slice(0, limit)
    .map((service) => localizeService(service, locale));
}

export function getAllServicesLocalized(
  locale: "vi" | "en" = "en",
): Service[] {
  return SERVICES.filter(isVisibleService).map((service) => localizeService(service, locale));
}

export function getSignatureServices(): Service[] {
  return SERVICES.filter((s) => s.isSignature && isVisibleService(s));
}
