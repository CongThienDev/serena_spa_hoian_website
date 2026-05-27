"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import TopBar from "./TopBar";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";
import { getDictionary } from "@/data/i18n";
import { localeFromPathname, withLocalePath } from "@/lib/i18n";

/**
 * SiteHeader — sticky, scroll-aware.
 * Logo: lotus mark + "SERENA SPA" serif + "Hội An" tagline — matching reference.
 * Scrolled state: adds warm shadow, slight cream bg solidification.
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = getDictionary(locale);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-header w-full">
      <TopBar />
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "bg-[var(--color-cream)] shadow-[var(--shadow-header)]"
            : "bg-[var(--color-cream)]"
        )}
      >
        <div className="container-site flex items-center justify-between h-[60px] md:h-[72px]">

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link
            href={withLocalePath(locale, "/")}
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="Serena Spa Hội An — Home"
          >
            {/* Lotus mark */}
            <LotusMarkSmall
              size={26}
              color="var(--color-terracotta)"
              className="transition-transform duration-300 group-hover:scale-110"
            />

            {/* Wordmark */}
            <div className="flex flex-col leading-none gap-0.5">
              <span
                className="font-serif text-lg md:text-[22px] tracking-[0.2em] text-[var(--color-espresso)] uppercase"
                style={{ fontWeight: 500 }}
              >
                Serena Spa
              </span>
              <span className="font-sans text-[9px] font-semibold tracking-[0.28em] text-[var(--color-terracotta)] uppercase">
                Hội An · Vietnam
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ──────────────────────────────────────────────── */}
          <MainNav />

          {/* ── Right — CTA + mobile menu ────────────────────────────────── */}
          <div className="flex items-center gap-3">
            <Link
              href={withLocalePath(locale, "/booking")}
              className="btn btn-primary btn-sm hidden md:inline-flex"
            >
              {t.header.bookNow}
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
