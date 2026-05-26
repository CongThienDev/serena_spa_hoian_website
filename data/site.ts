/**
 * Serena Spa — Site-wide constants
 * NAP data, hours, social links, navigation
 * TODO: Replace placeholder contact info with real details
 */

export const SITE = {
  name: "Serena Spa Hội An",
  tagline: "A Place to Glow",
  description:
    "Premium wellness spa offering signature massages, holistic treatments, and luxury healing experiences in the heart of Hội An.",
  url: "https://serenaspahoian.com",
} as const;

export const CONTACT = {
  phone: "+84 XXX XXX XXX",          // TODO: real phone
  phoneFormatted: "(+84) XXX XXX XXX",
  whatsapp: "+84XXXXXXXXX",           // TODO: real WhatsApp
  zalo: "+84XXXXXXXXX",               // TODO: real Zalo
  email: "info@serenaspahoian.com",
  address: "XXX Nguyễn Phúc Chu, Hội An, Quảng Nam, Vietnam",
  addressShort: "Nguyễn Phúc Chu, Hội An",
  googleMapsUrl: "https://maps.google.com/?q=Serena+Spa+Hoi+An",
  googleMapsEmbed: "", // TODO: embed URL from Google Maps
} as const;

export const HOURS = {
  weekdays: "09:00 – 21:00",
  weekends: "09:00 – 21:00",
  label: "Open daily 9:00 AM – 9:00 PM",
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/serenaspahoian", // TODO: verify
  facebook: "https://www.facebook.com/serenaspahoian",   // TODO: verify
  tiktok: "",
  tripadvisor: "",
} as const;

/* ── Navigation ─────────────────────────────────────────────────────────────
   Per ROUTING.md — main nav items with optional mega menu children
─────────────────────────────────────────────────────────────────────────── */
export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services" },
      { label: "Massage Therapy", href: "/services?category=massage" },
      { label: "Facial Treatments", href: "/services?category=facial" },
      { label: "Body Treatments", href: "/services?category=body" },
      { label: "Couple Packages", href: "/services?category=couple" },
    ],
  },
  {
    label: "Wellness",
    href: "/wellness",
    children: [
      { label: "Wellness Programs", href: "/wellness" },
      { label: "Day Packages", href: "/wellness#packages" },
      { label: "Retreats", href: "/wellness#retreats" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
