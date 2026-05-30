/**
 * Serena Spa — Site-wide constants
 * NAP data, hours, social links, navigation
 * TODO: Replace placeholder contact info with real details
 */

export const SITE = {
  name: "Serena Retreat",
  tagline: "A Place to Glow",
  description:
    "Premium wellness spa offering signature massages, holistic treatments, and luxury healing experiences in the heart of Hội An.",
  url: "https://serenaretreat.com",
} as const;

export const CONTACT = {
  phone: "+84935011151",
  phoneFormatted: "+84 935 011 151",
  whatsapp: "84935011151",
  zalo: "84935011151",
  email: "info@serenaretreat.com",
  address: "127 Nguyen Duy Hieu - Hoi An Dong - Da Nang",
  addressShort: "127 Nguyen Duy Hieu, Hoi An Dong",
  googleMapsUrl: "https://maps.google.com/?q=127+Nguyen+Duy+Hieu+Hoi+An+Dong+Da+Nang",
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
