import { type Locale } from "@/lib/i18n";
import { getDictionary } from "@/data/i18n";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export function getNavItems(locale: Locale): NavItem[] {
  const t = getDictionary(locale);

  return [
    { label: t.nav.about, href: "/about" },
    {
      label: t.nav.services,
      href: "/services",
      children: [
        { label: t.nav.servicesAll, href: "/services" },
        { label: t.nav.servicesMassage, href: "/services?category=massage" },
        { label: t.nav.servicesFacial, href: "/services?category=facial" },
        { label: t.nav.servicesBody, href: "/services?category=body" },
        { label: t.nav.servicesCouple, href: "/services?category=couple" }
      ]
    },
    {
      label: t.nav.wellness,
      href: "/wellness",
      children: [
        { label: t.nav.wellnessPrograms, href: "/wellness" },
        { label: t.nav.wellnessPackages, href: "/wellness#packages" },
        { label: t.nav.wellnessRetreats, href: "/wellness#retreats" }
      ]
    },
    { label: t.nav.gallery, href: "/gallery" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.contact, href: "/contact" }
  ];
}
