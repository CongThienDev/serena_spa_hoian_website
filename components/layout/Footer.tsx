"use client";

import Link from "next/link";
import { SITE, CONTACT, HOURS, SOCIAL } from "@/data/site";
import { getDictionary } from "@/data/i18n";
import { getNavItems } from "@/data/navigation";
import { localeFromPathname, withLocalePath } from "@/lib/i18n";
import { usePathname } from "next/navigation";

/**
 * Footer — 4-column layout on desktop, stacked on mobile.
 * Columns: Brand/about | Services | Company | Contact
 * Per HOME_WIREFRAME.md footer structure.
 */
export default function Footer() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = getDictionary(locale);
  const navItems = getNavItems(locale);
  const servicesNav = navItems.find((n) => n.href === "/services");
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--color-espresso)] text-[var(--color-sand)]"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main footer grid */}
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={withLocalePath(locale, "/")}
              className="inline-flex flex-col leading-none mb-5"
              aria-label="Serena Spa — Home"
            >
              <span className="font-serif text-2xl font-light tracking-widest text-[var(--color-cream)] uppercase">
                Serena
              </span>
              <span className="font-sans text-[10px] font-medium tracking-[0.22em] text-[var(--color-terracotta-light)] uppercase">
                Spa · Hội An
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-[var(--color-warm-gray-light)] max-w-[280px]">
              {SITE.description}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6" aria-label="Social media links">
              {SOCIAL.instagram && (
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="w-9 h-9 rounded-full border border-[var(--color-espresso-light)] flex items-center justify-center hover:border-[var(--color-peach)] hover:text-[var(--color-peach)] transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}
              {SOCIAL.facebook && (
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="w-9 h-9 rounded-full border border-[var(--color-espresso-light)] flex items-center justify-center hover:border-[var(--color-peach)] hover:text-[var(--color-peach)] transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Column 2 — Services links */}
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-[var(--color-peach)] mb-5">
              {t.footer.services}
            </h3>
            <ul className="space-y-3 text-sm text-[var(--color-warm-gray-light)]">
              {servicesNav?.children?.map((child) => (
                <li key={child.href}>
                  <Link
                    href={withLocalePath(locale, child.href)}
                    className="hover:text-[var(--color-peach)] transition-colors duration-200"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-[var(--color-peach)] mb-5">
              {t.footer.company}
            </h3>
            <ul className="space-y-3 text-sm text-[var(--color-warm-gray-light)]">
              {[
                { label: t.footer.aboutUs, href: "/about" },
                { label: t.nav.wellness, href: "/wellness" },
                { label: t.nav.gallery, href: "/gallery" },
                { label: t.nav.blog, href: "/blog" },
                { label: t.nav.contact, href: "/contact" },
                { label: t.footer.faqs, href: "/faq" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={withLocalePath(locale, item.href)}
                    className="hover:text-[var(--color-peach)] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact / Hours */}
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-[var(--color-peach)] mb-5">
              {t.footer.findUs}
            </h3>
            <address className="not-italic space-y-3 text-sm text-[var(--color-warm-gray-light)]">
              <p className="leading-relaxed">{CONTACT.address}</p>

              <p>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="hover:text-[var(--color-peach)] transition-colors duration-200"
                >
                  {CONTACT.phoneFormatted}
                </a>
              </p>

              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-[var(--color-peach)] transition-colors duration-200"
                >
                  {CONTACT.email}
                </a>
              </p>

              <p className="pt-1">
                <span className="block text-xs uppercase tracking-widest text-[var(--color-warm-gray)] mb-1">
                  {t.footer.openingHours}
                </span>
                {HOURS.label}
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-espresso-mid)]">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-xs text-[var(--color-warm-gray)]">
          <p>
            © {currentYear} {SITE.name}. {t.footer.allRightsReserved}
          </p>
          <nav aria-label="Legal links">
            <ul className="flex items-center gap-4">
              <li>
                <Link href={withLocalePath(locale, "/privacy-policy")} className="hover:text-[var(--color-peach)] transition-colors duration-200">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href={withLocalePath(locale, "/terms")} className="hover:text-[var(--color-peach)] transition-colors duration-200">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
