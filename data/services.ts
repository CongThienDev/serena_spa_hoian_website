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
    image: "/images/services/serena-signature-massage.jpg",
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
    image: "/images/services/facial-clay-therapy.jpg",
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
    image: "/images/services/hot-stone-therapy.jpg",
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
    image: "/images/services/foot-massage.jpg",
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
    image: "/images/services/couple-ritual.jpg",
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
    image: "/images/services/body-scrub-ritual.jpg",
    benefits: [
      "Dead skin cell removal",
      "Smoother, softer skin",
      "Boosted circulation",
      "Natural glow",
    ],
    isFeatured: false,
  },
];

/* ── Helper functions ───────────────────────────────────────────────────────
─────────────────────────────────────────────────────────────────────────── */

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServicesByCategory(categoryId: string): Service[] {
  return SERVICES.filter((s) => s.categoryId === categoryId);
}

export function getFeaturedServices(limit = 4): Service[] {
  return SERVICES.filter((s) => s.isFeatured).slice(0, limit);
}

export function getSignatureServices(): Service[] {
  return SERVICES.filter((s) => s.isSignature);
}
