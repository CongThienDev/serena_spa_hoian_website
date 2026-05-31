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
        { label: t.nav.servicesRelaxation, href: "/services?category=relaxation" },
        { label: t.nav.servicesBodyTreatment, href: "/services?category=body-treatment" },
        { label: t.nav.servicesFaceTreatment, href: "/services?category=face-treatment" },
        { label: t.nav.servicesBodyCareTreatment, href: "/services?category=body-care-treatment" },
        { label: t.nav.servicesSignature, href: "/services?category=serena-signature" },
        { label: t.nav.servicesPackage, href: "/services?category=spa-package" },
        { label: t.nav.servicesNailCare, href: "/services?category=nail-care" },
        { label: t.nav.servicesHairCare, href: "/services?category=hair-care" }
      ]
    },
    {
      label: t.nav.wellness,
      href: "/wellness",
      children: [
        { label: t.nav.wellnessOverview, href: "/wellness" },
        { label: t.nav.wellnessPhilosophy, href: "/wellness#philosophy" },
        { label: t.nav.wellnessMethod, href: "/wellness#method" }
      ]
    },
    { label: t.nav.gallery, href: "/gallery" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.contact, href: "/contact" }
  ];
}
