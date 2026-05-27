"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { getNavItems, type NavItem } from "@/data/navigation";
import { getDictionary } from "@/data/i18n";
import {
  localeFromPathname,
  type Locale,
  withLocalePath,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Desktop navigation with hover mega-menu dropdowns.
 * Per WIREFRAMES/interactions/service-hover.md:
 * - Rounded reveal animation
 * - 280ms ease-out dropdown
 * - Active state: terracotta underline
 */
export default function MainNav() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = getDictionary(locale);
  const navItems = getNavItems(locale);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleMouseEnter(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  }

  return (
    <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
      {navItems.map((item) => (
        <NavMenuItem
          key={item.label}
          item={item}
          locale={locale}
          isActive={
            pathname === withLocalePath(locale, item.href) ||
            pathname.startsWith(withLocalePath(locale, item.href) + "/")
          }
          isOpen={openMenu === item.label}
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
      <LanguageSwitcher locale={locale} label={t.header.switchLanguage} pathname={pathname} />
    </nav>
  );
}

type NavMenuItemProps = {
  item: NavItem;
  locale: Locale;
  isActive: boolean;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function NavMenuItem({
  item,
  locale,
  isActive,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: NavMenuItemProps) {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={withLocalePath(locale, item.href)}
        className={cn(
          "relative flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide",
          "text-[var(--color-espresso)] hover:text-[var(--color-terracotta)]",
          "transition-colors duration-200",
          "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px",
          "after:bg-[var(--color-terracotta)] after:scale-x-0 after:transition-transform",
          "after:duration-200 after:origin-left",
          (isActive || isOpen) &&
            "text-[var(--color-terracotta)] after:scale-x-100"
        )}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-haspopup={hasChildren ? "menu" : undefined}
      >
        {item.label}
        {hasChildren && (
          <svg
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>

      {/* Mega menu dropdown */}
      {hasChildren && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="menu"
              aria-label={`${item.label} submenu`}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={cn(
                "absolute left-0 top-full mt-2 min-w-[220px]",
                "bg-[var(--color-warm-white)] rounded-2xl",
                "border border-[var(--color-sand)] shadow-[var(--shadow-float)]",
                "py-2 overflow-hidden"
              )}
            >
              {item.children?.map((child) => (
                <DropdownItem key={child.href} item={child} locale={locale} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

function DropdownItem({ item, locale }: { item: NavItem; locale: Locale }) {
  const pathname = usePathname();
  const isActive = pathname === withLocalePath(locale, item.href);

  return (
    <Link
      href={withLocalePath(locale, item.href)}
      role="menuitem"
      className={cn(
        "block px-5 py-2.5 text-sm",
        "text-[var(--color-espresso-mid)] hover:text-[var(--color-terracotta)]",
        "hover:bg-[var(--color-cream)] transition-colors duration-150",
        isActive && "text-[var(--color-terracotta)] font-medium"
      )}
    >
      {item.label}
    </Link>
  );
}

function LanguageSwitcher({
  locale,
  label,
  pathname,
}: {
  locale: Locale;
  label: string;
  pathname: string;
}) {
  const targetLocale: Locale = locale === "vi" ? "en" : "vi";
  const nextHref = withLocalePath(targetLocale, pathname);

  return (
    <Link
      href={nextHref}
      aria-label={label}
      className="ml-3 inline-flex items-center gap-1 rounded-full border border-[var(--color-sand)] px-3 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-espresso)] transition-colors duration-200 hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
    >
      <span aria-hidden="true">🌐</span>
      <span>{locale.toUpperCase()} | {targetLocale.toUpperCase()}</span>
    </Link>
  );
}
