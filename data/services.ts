/**
 * Serena Spa — Services data
 * MVP: static data file. Phase 9: migrate to Sanity CMS.
 * Per CONTENT_CHECKLIST.md suggested categories and treatments.
 */

import { type Locale } from "@/lib/i18n";

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
  priceByDurationVND?: Partial<Record<number, number>>;
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
    id: "relaxation",
    label: "Relaxation",
    slug: "relaxation",
    description:
      "Relaxation therapies focused on releasing tension and restoring overall balance.",
  },
  {
    id: "body-treatment",
    label: "Body Treatment",
    slug: "body-treatment",
    description:
      "Therapeutic body massage services designed to recover muscles and calm the nervous system.",
  },
  {
    id: "face-treatment",
    label: "SPA - Face Treatment",
    slug: "face-treatment",
    description:
      "Facial care treatment to refresh, hydrate, and brighten skin.",
  },
  {
    id: "body-care-treatment",
    label: "SPA - Body Care Treatment",
    slug: "body-care-treatment",
    description:
      "Body wrap and body scrub treatments for detox and skin renewal.",
  },
  {
    id: "serena-signature",
    label: "Serena Signature",
    slug: "serena-signature",
    description:
      "Signature treatments from Serena Spa.",
  },
  {
    id: "spa-package",
    label: "SPA – Package",
    slug: "spa-package",
    description:
      "Wellness packages combining multiple treatments into one ritual.",
  },
  {
    id: "nail-care",
    label: "Nail Care",
    slug: "nail-care",
    description:
      "Basic to luxury manicure and pedicure services.",
  },
  {
    id: "hair-care",
    label: "Hair Care",
    slug: "hair-care",
    description:
      "Scalp and hair rituals for relaxation and nourishment.",
  },
];

export const SERVICES: Service[] = [
  {
    id: "foot-reflexology",
    slug: "foot-reflexology",
    categoryId: "relaxation",
    name: "Foot Reflexology",
    tagline: "Relaxation",
    description:
      "Foot Reflexology treatment focuses on stimulating reflex points on the soles of the feet to enhance blood circulation and restore balance.",
    duration: [30, 60],
    price: 10,
    priceVND: 250000,
    priceByDurationVND: {
      30: 250000,
      60: 450000,
    },
    image: "/images/serena_image/z7863130080318_bd46759e1d082e30adb7e1b0a0e90bd0.jpg",
    isFeatured: true,
  },
  {
    id: "back-neck-head-shoulder",
    slug: "back-neck-head-shoulder",
    categoryId: "relaxation",
    name: "Back Neck Head Shoulder",
    tagline: "Relaxation",
    description:
      "Back, Neck, Head & Shoulder Massage focuses on relieving tension in the upper body where stress and fatigue commonly accumulate.",
    duration: [30, 60],
    price: 13,
    priceVND: 320000,
    priceByDurationVND: {
      30: 320000,
      60: 500000,
    },
    image: "/images/serena_image/z7863130176379_c5ca367025c871384fcc1d77b7468dc8.jpg",
    isFeatured: true,
  },
  {
    id: "swedish-therapy-treatment",
    slug: "swedish-therapy-treatment",
    categoryId: "body-treatment",
    name: "Swedish Therapy Treatment",
    tagline: "Body Treatment",
    description:
      "A relaxing full-body massage using gentle flowing strokes to ease muscle tension, improve circulation, and calm body and mind.",
    duration: [60, 90],
    price: 22,
    priceVND: 550000,
    priceByDurationVND: {
      60: 550000,
      90: 800000,
    },
    image: "/images/serena_image/z7863130203764_6bc950cfa0128b88f9da0f0e14fc8264.jpg",
    isFeatured: true,
  },
  {
    id: "thai-massage",
    slug: "thai-massage",
    categoryId: "body-treatment",
    name: "Thai Massage",
    tagline: "Body Treatment",
    description:
      "This 60-minute Thai Massage combines acupressure and gentle stretching to relieve tension, improve flexibility, and restore energy flow.",
    duration: [60],
    price: 28,
    priceVND: 700000,
    image: "/images/serena_image/z7863130373074_bd43471af11ebd6a27da4edc71b541b6.jpg",
    isSignature: false,
  },
  {
    id: "rejuvenating-face-treatment",
    slug: "rejuvenating-face-treatment",
    categoryId: "face-treatment",
    name: "Rejuvenating Face Treatment",
    tagline: "SPA - Face Treatment",
    description:
      "A luxurious skincare therapy designed to refresh, brighten, and revitalize the skin with cleansing, exfoliation, nourishing masks, and relaxing facial massage.",
    duration: [60],
    price: 36,
    priceVND: 900000,
    image: "/images/serena_image/rosa-rafael-Pe9IXUuC6QU-unsplash.jpg",
  },
  {
    id: "mineral-mud-wrap-green-tea-wrap",
    slug: "mineral-mud-wrap-green-tea-wrap",
    categoryId: "body-care-treatment",
    name: "Mineral Mud Wrap / Green Tea Wrap",
    tagline: "Body Wrap",
    description:
      "A revitalizing body treatment designed to detoxify, nourish, and rejuvenate the skin using warm mineral-rich mud or green tea extract.",
    duration: [30, 60],
    price: 16,
    priceVND: 400000,
    priceByDurationVND: {
      30: 400000,
      60: 700000,
    },
    image: "/images/serena_image/premium_photo-1661490015867-61413eaef4a5.avif",
  },
  {
    id: "coffee-sea-salt-coconut-scrub",
    slug: "coffee-sea-salt-coconut-scrub",
    categoryId: "body-care-treatment",
    name: "Coffee / Sea Salt / Coconut Scrub",
    tagline: "Body Scrub",
    description:
      "An invigorating body treatment designed to exfoliate, detoxify, and revitalize the skin using coffee, sea salt, or coconut.",
    duration: [30, 60],
    price: 16,
    priceVND: 400000,
    priceByDurationVND: {
      30: 400000,
      60: 700000,
    },
    image: "/images/serena_image/dear-scrub-GEGPGa7lYMc-unsplash.jpg",
  },
  {
    id: "serena-healthy-treatment-himalaya-salt-stone",
    slug: "serena-healthy-treatment-himalaya-salt-stone",
    categoryId: "serena-signature",
    name: "Serena Healthy Treatment with Himalaya Salt Stone",
    tagline: "Serena Signature",
    description:
      "A signature wellness therapy designed to restore balance and rejuvenate the body using warm Himalayan salt stones.",
    duration: [60, 90],
    price: 28,
    priceVND: 700000,
    priceByDurationVND: {
      60: 700000,
      90: 1100000,
    },
    image: "/images/serena_image/Himalayan-Salt-Massage-Hero-800x1000.jpg",
    isSignature: true,
    isFeatured: true,
  },
  {
    id: "hot-stone-treatment",
    slug: "hot-stone-treatment",
    categoryId: "serena-signature",
    name: "Hot Stone Treatment",
    tagline: "Serena Signature",
    description:
      "A deeply relaxing therapy using smooth heated basalt stones to warm muscles, improve circulation, and relieve chronic tension.",
    duration: [90],
    price: 36,
    priceVND: 900000,
    image: "/images/serena_image/taylor-heery-_TyrA1RUaiI-unsplash.jpg",
  },
  {
    id: "aroma-treatment",
    slug: "aroma-treatment",
    categoryId: "serena-signature",
    name: "Aroma Treatment",
    tagline: "Serena Signature",
    description:
      "A 90-minute holistic therapy combining essential oils and herbal extracts to relax muscles and calm the mind.",
    duration: [90],
    price: 36,
    priceVND: 900000,
    image: "/images/serena_image/premium_photo-1723795304943-9477dd459db6.avif",
  },
  {
    id: "serena-renewal-body-ritual-package",
    slug: "serena-renewal-body-ritual-package",
    categoryId: "spa-package",
    name: "Serena Renewal Body Ritual Package",
    tagline: "SPA – Package",
    description:
      "120-minute body ritual including 30 minutes scrub or wrap and 90 minutes Swedish massage.",
    duration: [120],
    price: 50,
    priceVND: 1250000,
    image: "/images/serena_image/z7863130176379_c5ca367025c871384fcc1d77b7468dc8.jpg",
    isSignature: true,
  },
  {
    id: "serena-glow-balance-couples",
    slug: "serena-glow-balance-couples",
    categoryId: "spa-package",
    name: "Serena Glow & Balance / Couples",
    tagline: "SPA – Package",
    description:
      "Luxurious 150-minute couples treatment with scrub or wrap, Swedish massage, and rejuvenating facial.",
    duration: [150],
    price: 118,
    priceVND: 2950000,
    image: "/images/serena_image/z7863130225920_fcbb5881c13f6f51fd437554d30283e4.jpg",
    isSignature: true,
    isFeatured: true,
  },
  {
    id: "serena-grand-harmony-package",
    slug: "serena-grand-harmony-package",
    categoryId: "spa-package",
    name: "Serena Grand Harmony Package",
    tagline: "SPA – Package",
    description:
      "180-minute signature package with scrub or wrap, Himalayan Salt Stone therapy, and rejuvenating facial.",
    duration: [180],
    price: 66,
    priceVND: 1650000,
    image: "/images/serena_image/z7863130373074_bd43471af11ebd6a27da4edc71b541b6.jpg",
    isSignature: true,
  },
  {
    id: "serena-nourish-renew-package",
    slug: "serena-nourish-renew-package",
    categoryId: "spa-package",
    name: "Serena Nourish & Renew Package",
    tagline: "SPA – Package",
    description:
      "3-hour holistic package including scrub or wrap, aroma/herbal massage, facial treatment, and healthy juice with yogurt granola.",
    duration: [180],
    price: 78,
    priceVND: 1950000,
    image: "/images/serena_image/z7863130203764_6bc950cfa0128b88f9da0f0e14fc8264.jpg",
    isSignature: true,
  },
  {
    id: "serena-signature-3-days-long-stay-couple",
    slug: "serena-signature-3-days-long-stay-couple",
    categoryId: "spa-package",
    name: "Serena Signature 3 Days for Long-Stay Guest / Couple",
    tagline: "SPA – Package",
    description:
      "3-day signature package for long-stay guests or couples: 90-minute treatment each day for 2 guests, with healthy refreshments and special gift.",
    duration: [90],
    price: 198,
    priceVND: 4950000,
    image: "/images/serena_image/z7863130176379_c5ca367025c871384fcc1d77b7468dc8.jpg",
    isSignature: true,
    isFeatured: true,
  },
  {
    id: "basic-manicure-or-pedicure",
    slug: "basic-manicure-or-pedicure",
    categoryId: "nail-care",
    name: "Basic Manicure OR Pedicure",
    tagline: "Nail Care",
    description:
      "Basic manicure or pedicure care.",
    duration: [30, 60],
    price: 14,
    priceVND: 350000,
    priceByDurationVND: {
      30: 350000,
      60: 550000,
    },
    image: "/images/serena_image/z7863130399936_a16c4518ce69d94cc60728eb569ee3ae.jpg",
  },
  {
    id: "gel-polish-classic",
    slug: "gel-polish-classic",
    categoryId: "nail-care",
    name: "Gel Polish Classic (Manicure / Pedicure)",
    tagline: "Nail Care",
    description:
      "Classic gel polish for manicure or pedicure.",
    duration: [60],
    price: 26,
    priceVND: 650000,
    image: "/images/serena_image/z7863130399936_a16c4518ce69d94cc60728eb569ee3ae.jpg",
  },
  {
    id: "luxury-gel-care-ritual",
    slug: "luxury-gel-care-ritual",
    categoryId: "nail-care",
    name: "Luxury Gel Care Ritual",
    tagline: "Nail Care",
    description:
      "Luxury gel care ritual for enhanced nail treatment.",
    duration: [60],
    price: 32,
    priceVND: 800000,
    image: "/images/serena_image/z7863130399936_a16c4518ce69d94cc60728eb569ee3ae.jpg",
  },
  {
    id: "luxury-nail-art-package",
    slug: "luxury-nail-art-package",
    categoryId: "nail-care",
    name: "Luxury Nail Art Package",
    tagline: "Nail Care",
    description:
      "Luxury nail art package.",
    duration: [75],
    price: 36,
    priceVND: 900000,
    image: "/images/serena_image/z7863130399936_a16c4518ce69d94cc60728eb569ee3ae.jpg",
  },
  {
    id: "soak-off-gel-removal",
    slug: "soak-off-gel-removal",
    categoryId: "nail-care",
    name: "Soak-off Gel Removal",
    tagline: "Nail Care",
    description:
      "Soak-off gel removal service.",
    duration: [20],
    price: 8,
    priceVND: 200000,
    image: "/images/serena_image/z7863130399936_a16c4518ce69d94cc60728eb569ee3ae.jpg",
  },
  {
    id: "serena-an-nhien-scalp-ritual",
    slug: "serena-an-nhien-scalp-ritual",
    categoryId: "hair-care",
    name: "Serena An Nhiên Scalp Ritual",
    tagline: "Hair Care",
    description:
      "45-minute scalp ritual to relieve tension, nourish scalp, and refresh hair.",
    duration: [45],
    price: 16,
    priceVND: 400000,
    image: "/images/serena_image/z7863130216608_73332d9cd639070a514abcd33a5d3c1f.jpg",
  },
  {
    id: "serena-meridian-flow",
    slug: "serena-meridian-flow",
    categoryId: "hair-care",
    name: "Serena Meridian Flow",
    tagline: "Hair Care",
    description:
      "75-minute therapy designed to unblock meridians, relieve tension, and promote energy flow.",
    duration: [75],
    price: 28,
    priceVND: 700000,
    image: "/images/serena_image/z7863130216608_73332d9cd639070a514abcd33a5d3c1f.jpg",
  },
  {
    id: "serena-calm-and-glow",
    slug: "serena-calm-and-glow",
    categoryId: "hair-care",
    name: "Serena Calm & Glow",
    tagline: "Hair Care",
    description:
      "100-minute treatment to relax the mind, nourish the skin, and restore inner calm.",
    duration: [100],
    price: 44,
    priceVND: 1100000,
    image: "/images/serena_image/z7863130216608_73332d9cd639070a514abcd33a5d3c1f.jpg",
  },
];

const HIDDEN_SERVICE_SLUGS = new Set<string>([]);

function isVisibleService(service: Service): boolean {
  return !HIDDEN_SERVICE_SLUGS.has(service.slug);
}

const CATEGORY_LABELS_VI: Record<string, { label: string; description: string }> = {
  relaxation: {
    label: "Thư giãn",
    description: "Các liệu trình thư giãn giúp giải tỏa căng thẳng và cân bằng cơ thể.",
  },
  "body-treatment": {
    label: "Trị liệu cơ thể",
    description: "Các liệu trình massage cơ thể giúp phục hồi cơ bắp và thư giãn sâu.",
  },
  "face-treatment": {
    label: "Chăm sóc da mặt",
    description: "Liệu trình chăm sóc da mặt giúp làm sáng, dưỡng ẩm và tái tạo làn da.",
  },
  "body-care-treatment": {
    label: "Chăm sóc cơ thể",
    description: "Liệu trình ủ và tẩy toàn thân giúp làm sạch, nuôi dưỡng và tái tạo làn da.",
  },
  "serena-signature": {
    label: "Serena đặc biệt",
    description: "Các liệu trình đặc trưng của Serena Spa.",
  },
  "spa-package": {
    label: "Gói spa",
    description: "Gói liệu trình kết hợp nhiều dịch vụ trong một trải nghiệm.",
  },
  "nail-care": {
    label: "Chăm sóc móng",
    description: "Dịch vụ chăm sóc móng từ cơ bản đến cao cấp.",
  },
  "hair-care": {
    label: "Chăm sóc tóc",
    description: "Các liệu trình gội dưỡng và chăm sóc da đầu thư giãn.",
  },
};

const SERVICES_VI: Record<string, LocalizedServiceOverride> = {
  "foot-reflexology": {
    name: "Trị Liệu Chân",
    tagline: "Thư giãn",
    description:
      "Liệu trình tập trung tác động vào các huyệt đạo phản xạ dưới lòng bàn chân, giúp kích thích tuần hoàn máu và cân bằng năng lượng cơ thể.",
  },
  "back-neck-head-shoulder": {
    name: "Lưng, Đầu Vai Cổ",
    tagline: "Thư giãn",
    description:
      "Liệu trình massage lưng - cổ - vai - đầu tập trung thư giãn các vùng dễ tích tụ căng thẳng và mệt mỏi, giúp giảm đau nhức do làm việc lâu, di chuyển nhiều hoặc tư thế sai.",
  },
  "swedish-therapy-treatment": {
    name: "Trị Liệu Thụy Điển",
    tagline: "Trị liệu cơ thể",
    description:
      "Liệu pháp massage thư giãn toàn thân với các động tác nhẹ nhàng giúp giảm căng cơ, cải thiện tuần hoàn máu và mang lại cảm giác thư thái cho cơ thể lẫn tinh thần.",
  },
  "thai-massage": {
    name: "Thái Massage",
    tagline: "Trị liệu cơ thể",
    description:
      "Liệu pháp Massage Thái 60 phút kết hợp bấm huyệt và kéo giãn nhẹ nhàng giúp giảm căng cơ, tăng độ linh hoạt và cân bằng năng lượng cho cơ thể.",
  },
  "rejuvenating-face-treatment": {
    name: "Liệu Pháp Chăm Sóc Da Mặt Trắng Sáng",
    tagline: "SPA - Chăm sóc da mặt",
    description:
      "Phương pháp chăm sóc da cao cấp giúp tái tạo, làm sáng và phục hồi sức sống cho làn da, bao gồm làm sạch, tẩy tế bào chết nhẹ, đắp mặt nạ dưỡng chất và massage mặt thư giãn.",
  },
  "mineral-mud-wrap-green-tea-wrap": {
    name: "Ủ Bùn Non / Trà Xanh",
    tagline: "Ủ toàn thân",
    description:
      "Liệu trình chăm sóc cơ thể giúp thải độc, nuôi dưỡng và phục hồi sức sống cho làn da bằng bùn khoáng hoặc chiết xuất trà xanh.",
  },
  "coffee-sea-salt-coconut-scrub": {
    name: "Tẩy Cà Phê / Muối / Dừa",
    tagline: "Tẩy toàn thân",
    description:
      "Liệu trình tẩy tế bào chết toàn thân giúp loại bỏ tế bào chết, làm sạch da, kích thích tuần hoàn và mang lại cảm giác thư giãn sảng khoái.",
  },
  "serena-healthy-treatment-himalaya-salt-stone": {
    name: "Trị Liệu Serena Đặc Biệt Với Đá Himalaya",
    tagline: "Serena đặc biệt",
    description:
      "Liệu trình chăm sóc sức khỏe độc quyền với đá muối Himalaya làm ấm giúp giải tỏa căng cơ sâu, hỗ trợ thải độc và kích thích tuần hoàn máu.",
  },
  "hot-stone-treatment": {
    name: "Trị Liệu Đá Nóng",
    tagline: "Serena đặc biệt",
    description:
      "Liệu trình thư giãn sâu sử dụng đá bazan nóng đặt lên các huyệt đạo quan trọng và kết hợp massage để giảm căng cơ, giảm stress và cân bằng năng lượng.",
  },
  "aroma-treatment": {
    name: "Liệu Pháp Hương Thơm",
    tagline: "Serena đặc biệt",
    description:
      "Liệu trình 90 phút kết hợp tinh dầu và thảo dược thơm dịu giúp thả lỏng cơ bắp, làm dịu tinh thần và hỗ trợ thải độc.",
  },
  "serena-renewal-body-ritual-package": {
    name: "Gói Tẩy Sạch Mệt Mỏi - Chạm Lành Từ Bên Trong",
    tagline: "Gói Spa",
    description:
      "Liệu trình 120 phút gồm 30 phút tẩy tế bào chết hoặc ủ dưỡng da và 90 phút massage Thụy Điển giúp tái tạo năng lượng và thư giãn sâu.",
  },
  "serena-glow-balance-couples": {
    name: "Gói Sáng Da - Nhẹ Thân - Tâm An",
    tagline: "Gói Spa",
    description:
      "Liệu trình 150 phút dành cho 2 người gồm tẩy/ủ dưỡng da, massage Thụy Điển toàn thân và chăm sóc da mặt trẻ hóa.",
  },
  "serena-grand-harmony-package": {
    name: "Gói Cân Bằng Toàn Diện",
    tagline: "Gói Spa",
    description:
      "Liệu trình 180 phút gồm tẩy/ủ dưỡng da, trị liệu Đá Muối Himalaya 90 phút và chăm sóc da mặt 60 phút cho trải nghiệm phục hồi toàn diện.",
  },
  "serena-nourish-renew-package": {
    name: "Gói Liệu Trình Phục Hồi Cơ Thể Và Dinh Dưỡng Lành Mạnh",
    tagline: "Gói Spa",
    description:
      "Gói 3 giờ gồm tẩy/ủ dưỡng da, massage thảo dược 90 phút, chăm sóc da mặt 60 phút, kèm nước ép healthy và Yogurt Granola.",
  },
  "serena-signature-3-days-long-stay-couple": {
    name: "Gói Trải Nghiệm An Yên 3 Ngày Dành Cho Các Cặp Đôi",
    tagline: "Gói Spa",
    description:
      "Gói 3 ngày cho khách lưu trú dài ngày: mỗi ngày 90 phút trị liệu tự chọn, áp dụng cho 2 khách, kèm đồ ăn nhẹ healthy sau mỗi buổi.",
  },
  "basic-manicure-or-pedicure": {
    name: "Basic Manicure OR Pedicure",
    tagline: "Chăm sóc móng",
    description:
      "Chăm sóc móng tay hoặc móng chân cơ bản.",
  },
  "gel-polish-classic": {
    name: "Gel Polish Classic (Manicure / Pedicure)",
    tagline: "Chăm sóc móng",
    description:
      "Chăm sóc da và sơn gel cơ bản cho móng tay hoặc móng chân.",
  },
  "luxury-gel-care-ritual": {
    name: "Luxury Gel Care Ritual",
    tagline: "Chăm sóc móng",
    description:
      "Liệu trình chăm sóc da và móng cao cấp.",
  },
  "luxury-nail-art-package": {
    name: "Luxury Nail Art Package",
    tagline: "Chăm sóc móng",
    description:
      "Sơn gel cao cấp, vẽ hoặc đính đá tinh tế, đắp bột hoặc đắp gel tạo hình 3D.",
  },
  "soak-off-gel-removal": {
    name: "Soak-off Gel Removal",
    tagline: "Chăm sóc móng",
    description:
      "Gỡ gel cũ nhẹ nhàng.",
  },
  "serena-an-nhien-scalp-ritual": {
    name: "Serena An Nhiên Scalp Ritual",
    tagline: "Chăm sóc tóc",
    description:
      "Liệu trình 45 phút giúp giảm căng thẳng, nuôi dưỡng da đầu và làm mới tóc, kết hợp massage nhẹ và làm sạch.",
  },
  "serena-meridian-flow": {
    name: "Serena Meridian Flow",
    tagline: "Chăm sóc tóc",
    description:
      "Liệu trình 75 phút giúp khai thông kinh lạc, giảm căng cơ và thúc đẩy lưu thông năng lượng.",
  },
  "serena-calm-and-glow": {
    name: "Serena Calm & Glow",
    tagline: "Chăm sóc tóc",
    description:
      "Liệu trình 100 phút giúp thư giãn tinh thần, nuôi dưỡng làn da và mang lại cảm giác an dịu bên trong.",
  },
};

const CATEGORY_LABELS_KO: Record<string, { label: string; description: string }> = {
  relaxation: {
    label: "릴랙세이션",
    description: "긴장을 풀고 몸의 균형을 되찾아 주는 릴랙세이션 트리트먼트입니다.",
  },
  "body-treatment": {
    label: "바디 트리트먼트",
    description: "근육을 회복시키고 깊은 이완을 선사하는 바디 마사지 트리트먼트입니다.",
  },
  "face-treatment": {
    label: "페이스 트리트먼트",
    description: "피부를 밝히고 수분을 채우며 재생시키는 페이셜 케어 트리트먼트입니다.",
  },
  "body-care-treatment": {
    label: "바디 케어",
    description: "전신 랩과 스크럽으로 피부를 정화하고 영양을 공급해 재생합니다.",
  },
  "serena-signature": {
    label: "세레나 시그니처",
    description: "세레나 스파만의 시그니처 트리트먼트입니다.",
  },
  "spa-package": {
    label: "스파 패키지",
    description: "여러 트리트먼트를 하나의 의식으로 결합한 패키지입니다.",
  },
  "nail-care": {
    label: "네일 케어",
    description: "기본부터 럭셔리까지 다양한 네일 케어 서비스입니다.",
  },
  "hair-care": {
    label: "헤어 케어",
    description: "두피를 진정시키고 모발에 활력을 주는 릴랙싱 케어 트리트먼트입니다.",
  },
};

// 한국어 임시 번역 — 검토 후 다듬어 주세요 (Korean placeholder translations — please review/refine).
const SERVICES_KO: Record<string, LocalizedServiceOverride> = {
  "foot-reflexology": {
    name: "발 지압 마사지",
    tagline: "릴랙세이션",
    description:
      "발바닥의 반사 지점을 자극해 혈액 순환을 촉진하고 몸의 에너지 균형을 맞춰 주는 트리트먼트입니다.",
  },
  "back-neck-head-shoulder": {
    name: "등·목·어깨·머리",
    tagline: "릴랙세이션",
    description:
      "긴장이 쌓이기 쉬운 등·목·어깨·머리를 집중적으로 풀어 주어 장시간 업무, 이동, 잘못된 자세로 인한 통증을 완화합니다.",
  },
  "swedish-therapy-treatment": {
    name: "릴랙싱 오일 마사지",
    tagline: "바디 트리트먼트",
    description:
      "부드러운 동작의 전신 릴랙싱 마사지로 근육 긴장을 풀고 혈액 순환을 개선하며 몸과 마음에 편안함을 선사합니다.",
  },
  "thai-massage": {
    name: "타이 마사지",
    tagline: "바디 트리트먼트",
    description:
      "지압과 부드러운 스트레칭을 결합한 60분 타이 마사지로 근육 긴장을 풀고 유연성과 에너지 균형을 높입니다.",
  },
  "rejuvenating-face-treatment": {
    name: "브라이트닝 페이셜 트리트먼트",
    tagline: "스파 - 페이스 트리트먼트",
    description:
      "클렌징, 부드러운 각질 제거, 영양 마스크, 릴랙싱 페이셜 마사지로 피부를 재생하고 밝히며 활력을 되찾아 주는 프리미엄 케어입니다.",
  },
  "mineral-mud-wrap-green-tea-wrap": {
    name: "미네랄 머드 / 녹차 랩",
    tagline: "전신 랩",
    description:
      "미네랄 머드 또는 녹차 추출물로 노폐물을 배출하고 피부에 영양을 공급해 활력을 되찾아 주는 바디 케어 트리트먼트입니다.",
  },
  "coffee-sea-salt-coconut-scrub": {
    name: "커피 / 소금 / 코코넛 스크럽",
    tagline: "전신 스크럽",
    description:
      "전신 각질을 제거해 피부를 깨끗이 하고 혈액 순환을 촉진하며 상쾌한 이완감을 선사하는 스크럽 트리트먼트입니다.",
  },
  "serena-healthy-treatment-himalaya-salt-stone": {
    name: "히말라야 소금돌 세레나 시그니처 트리트먼트",
    tagline: "세레나 시그니처",
    description:
      "따뜻한 히말라야 소금돌을 활용한 독점 웰니스 트리트먼트로 깊은 근육 긴장을 풀고 해독을 돕고 혈액 순환을 촉진합니다.",
  },
  "hot-stone-treatment": {
    name: "핫 스톤 트리트먼트",
    tagline: "세레나 시그니처",
    description:
      "따뜻한 현무암을 주요 지점에 올리고 마사지를 결합해 근육 긴장과 스트레스를 풀고 에너지 균형을 맞추는 깊은 이완 트리트먼트입니다.",
  },
  "aroma-treatment": {
    name: "아로마 트리트먼트",
    tagline: "세레나 시그니처",
    description:
      "에센셜 오일과 은은한 허브를 결합한 90분 트리트먼트로 근육을 이완하고 마음을 진정시키며 해독을 돕습니다.",
  },
  "serena-renewal-body-ritual-package": {
    name: "세레나 리뉴얼 바디 리추얼 패키지",
    tagline: "스파 패키지",
    description:
      "30분 스크럽 또는 영양 랩과 90분 릴랙싱 오일 마사지로 구성된 120분 트리트먼트로 에너지를 재충전하고 깊은 이완을 선사합니다.",
  },
  "serena-glow-balance-couples": {
    name: "글로우·밸런스 커플 패키지",
    tagline: "스파 패키지",
    description:
      "2인을 위한 150분 트리트먼트로 스크럽/영양 랩, 전신 릴랙싱 오일 마사지, 안티에이징 페이셜로 구성됩니다.",
  },
  "serena-grand-harmony-package": {
    name: "그랜드 하모니 밸런스 패키지",
    tagline: "스파 패키지",
    description:
      "스크럽/영양 랩, 90분 히말라야 소금돌 트리트먼트, 60분 페이셜로 구성된 180분 토탈 회복 트리트먼트입니다.",
  },
  "serena-nourish-renew-package": {
    name: "너리시·리뉴 회복 영양 패키지",
    tagline: "스파 패키지",
    description:
      "스크럽/영양 랩, 90분 허브 마사지, 60분 페이셜에 헬시 주스와 요거트 그래놀라가 포함된 3시간 패키지입니다.",
  },
  "serena-signature-3-days-long-stay-couple": {
    name: "3일 롱스테이 커플 세레나 시그니처 패키지",
    tagline: "스파 패키지",
    description:
      "장기 투숙객을 위한 3일 패키지로 매일 90분 선택 트리트먼트를 2인에게 제공하며 매 세션 후 헬시 스낵이 포함됩니다.",
  },
  "basic-manicure-or-pedicure": {
    name: "베이직 매니큐어 또는 페디큐어",
    tagline: "네일 케어",
    description: "기본 손톱 또는 발톱 케어입니다.",
  },
  "gel-polish-classic": {
    name: "젤 폴리시 클래식 (매니큐어 / 페디큐어)",
    tagline: "네일 케어",
    description: "손톱 또는 발톱 기본 케어와 젤 컬러입니다.",
  },
  "luxury-gel-care-ritual": {
    name: "럭셔리 젤 케어 리추얼",
    tagline: "네일 케어",
    description: "프리미엄 피부 및 네일 케어 리추얼입니다.",
  },
  "luxury-nail-art-package": {
    name: "럭셔리 네일 아트 패키지",
    tagline: "네일 케어",
    description: "프리미엄 젤 컬러, 정교한 아트 또는 큐빅, 3D 아크릴 또는 젤 익스텐션입니다.",
  },
  "soak-off-gel-removal": {
    name: "젤 제거 (소크 오프)",
    tagline: "네일 케어",
    description: "기존 젤을 부드럽게 제거합니다.",
  },
  "serena-an-nhien-scalp-ritual": {
    name: "세레나 안니엔 스칼프 리추얼",
    tagline: "헤어 케어",
    description:
      "부드러운 마사지와 클렌징을 결합해 스트레스를 줄이고 두피에 영양을 공급하며 모발을 새롭게 하는 45분 트리트먼트입니다.",
  },
  "serena-meridian-flow": {
    name: "세레나 메리디안 플로우",
    tagline: "헤어 케어",
    description:
      "경락을 열어 근육 긴장을 풀고 에너지 순환을 촉진하는 75분 트리트먼트입니다.",
  },
  "serena-calm-and-glow": {
    name: "세레나 캄 & 글로우",
    tagline: "헤어 케어",
    description:
      "마음을 이완하고 피부에 영양을 공급해 내면의 평온함을 선사하는 100분 트리트먼트입니다.",
  },
};

const SERVICE_OVERRIDES: Partial<Record<Locale, Record<string, LocalizedServiceOverride>>> = {
  vi: SERVICES_VI,
  ko: SERVICES_KO,
};

const CATEGORY_LABEL_OVERRIDES: Partial<
  Record<Locale, Record<string, { label: string; description: string }>>
> = {
  vi: CATEGORY_LABELS_VI,
  ko: CATEGORY_LABELS_KO,
};

function localizeService(service: Service, locale: Locale): Service {
  const overrides = SERVICE_OVERRIDES[locale];
  if (!overrides) return service;
  return { ...service, ...(overrides[service.id] ?? {}) };
}

export function getServicePriceVND(service: Service, durationMinutes?: number): number {
  if (durationMinutes != null) {
    const durationPrice = service.priceByDurationVND?.[durationMinutes];
    if (durationPrice != null) return durationPrice;
  }

  if (service.priceVND != null) return service.priceVND;
  return Math.round(service.price * 25000);
}

export function getServiceCategories(locale: Locale = "en"): ServiceCategory[] {
  const labels = CATEGORY_LABEL_OVERRIDES[locale];
  if (!labels) return SERVICE_CATEGORIES;
  return SERVICE_CATEGORIES.map((cat) => ({
    ...cat,
    label: labels[cat.id]?.label ?? cat.label,
    description: labels[cat.id]?.description ?? cat.description,
  }));
}

/* ── Helper functions ───────────────────────────────────────────────────────
─────────────────────────────────────────────────────────────────────────── */

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug && isVisibleService(s));
}

export function getServiceBySlugLocalized(
  slug: string,
  locale: Locale = "en",
): Service | undefined {
  const service = SERVICES.find((s) => s.slug === slug && isVisibleService(s));
  return service ? localizeService(service, locale) : undefined;
}

export function getServicesByCategory(categoryId: string): Service[] {
  return SERVICES.filter((s) => s.categoryId === categoryId && isVisibleService(s));
}

export function getServicesByCategoryLocalized(
  categoryId: string,
  locale: Locale = "en",
): Service[] {
  return SERVICES.filter((s) => s.categoryId === categoryId && isVisibleService(s))
    .map((service) => localizeService(service, locale));
}

export function getFeaturedServices(limit = 4): Service[] {
  return SERVICES.filter((s) => s.isFeatured && isVisibleService(s)).slice(0, limit);
}

export function getFeaturedServicesLocalized(
  limit = 4,
  locale: Locale = "en",
): Service[] {
  return SERVICES.filter((s) => s.isFeatured && isVisibleService(s))
    .slice(0, limit)
    .map((service) => localizeService(service, locale));
}

export function getAllServicesLocalized(
  locale: Locale = "en",
): Service[] {
  return SERVICES.filter(isVisibleService).map((service) => localizeService(service, locale));
}

export function getSignatureServices(): Service[] {
  return SERVICES.filter((s) => s.isSignature && isVisibleService(s));
}
