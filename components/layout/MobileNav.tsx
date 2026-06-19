"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CONTACT } from "@/data/site";
import { getDictionary } from "@/data/i18n";
import { getNavItems, type NavItem } from "@/data/navigation";
import {
  localeFromPathname,
  type Locale,
  SUPPORTED_LOCALES,
  stripLocalePrefix,
  withLocalePath,
} from "@/lib/i18n";
import { LOCALE_LABELS } from "./MainNav";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = getDictionary(locale);
  const navItems = getNavItems(locale);

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "lg:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11",
          "text-[var(--color-espresso)] hover:text-[var(--color-terracotta)]",
          "transition-colors duration-200"
        )}
        aria-label={isOpen ? t.mobileNav.closeMenu : t.mobileNav.openMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
      >
        <span className={cn("block w-5 h-px bg-current transition-all duration-300 origin-center", isOpen && "translate-y-[7px] rotate-45")} />
        <span className={cn("block w-5 h-px bg-current transition-all duration-300", isOpen && "opacity-0 scale-x-0")} />
        <span className={cn("block w-5 h-px bg-current transition-all duration-300 origin-center", isOpen && "-translate-y-[7px] -rotate-45")} />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-nav lg:hidden transition-opacity duration-200",
          isOpen ? "opacity-100 pointer-events-auto bg-black/40 backdrop-blur-sm" : "opacity-0 pointer-events-none"
        )}
        onClick={close}
        aria-hidden="true"
      />

      <nav
        id="mobile-nav-drawer"
        role="dialog"
        aria-label={t.mobileNav.mobileNavigation}
        aria-modal="true"
        className={cn(
          "fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm z-nav lg:hidden",
          "bg-[var(--color-cream)] flex flex-col overflow-y-auto",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-sand)]">
          <Link href={withLocalePath(locale, "/")} onClick={close} className="inline-flex">
            <Image
              src="/images/logo/Serena-logo.webp"
              alt="Serena Retreat"
              width={48}
              height={48}
              unoptimized
              className="h-12 w-12 object-contain"
            />
          </Link>
          <button onClick={close} className="w-11 h-11 flex items-center justify-center text-[var(--color-espresso-mid)]" aria-label={t.mobileNav.closeMenu}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="flex-1 px-6 py-6 space-y-1">
          {navItems.map((item) => (
            <MobileNavItem
              key={item.label}
              item={item}
              locale={locale}
              isActive={pathname === withLocalePath(locale, item.href) || pathname.startsWith(withLocalePath(locale, item.href) + "/")}
              onClose={close}
            />
          ))}
        </ul>

        <div className="px-6 py-6 border-t border-[var(--color-sand)] space-y-3">
          <Link href={withLocalePath(locale, "/booking")} onClick={close} className="btn btn-primary w-full justify-center">
            {t.header.bookNow}
          </Link>
          <a href={`tel:${CONTACT.phone}`} className="btn btn-outline w-full justify-center">
            {t.mobileNav.callUs}
          </a>

          <div className="pt-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-warm-gray)]">
              {t.header.switchLanguage}
            </p>
            <div className="flex flex-wrap gap-2">
              {SUPPORTED_LOCALES.map((loc) => (
                <Link
                  key={loc}
                  href={withLocalePath(loc, stripLocalePrefix(pathname))}
                  hrefLang={loc}
                  onClick={close}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition-colors duration-200",
                    loc === locale
                      ? "border-[var(--color-terracotta)] text-[var(--color-terracotta)] font-medium"
                      : "border-[var(--color-sand)] text-[var(--color-espresso)] hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
                  )}
                >
                  {LOCALE_LABELS[loc]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

type MobileNavItemProps = {
  item: NavItem;
  locale: Locale;
  isActive: boolean;
  onClose: () => void;
};

function MobileNavItem({ item, locale, isActive, onClose }: MobileNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = getDictionary(locale);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      <div className="flex items-center justify-between">
        <Link
          href={withLocalePath(locale, item.href)}
          onClick={onClose}
          className={cn(
            "flex-1 py-3 text-base font-medium",
            "text-[var(--color-espresso)] hover:text-[var(--color-terracotta)]",
            "transition-colors duration-200",
            isActive && "text-[var(--color-terracotta)]"
          )}
        >
          {item.label}
        </Link>

        {hasChildren && (
          <button
            onClick={() => setIsExpanded((v) => !v)}
            className={cn(
              "w-10 h-10 flex items-center justify-center",
              "text-[var(--color-warm-gray)] hover:text-[var(--color-terracotta)]",
              "transition-colors duration-200"
            )}
            aria-label={`${isExpanded ? t.mobileNav.collapse : t.mobileNav.expand} ${item.label}`}
            aria-expanded={isExpanded}
          >
            <svg className={cn("w-4 h-4 transition-transform duration-200", isExpanded && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {hasChildren && (
        <ul className={cn("overflow-hidden pl-4 transition-all duration-200", isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={withLocalePath(locale, child.href)}
                onClick={onClose}
                className={cn(
                  "block py-2.5 text-sm",
                  "text-[var(--color-espresso-mid)] hover:text-[var(--color-terracotta)]",
                  "transition-colors duration-200"
                )}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
