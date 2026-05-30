"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import TopBar from "./TopBar";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
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
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const next = window.scrollY > 60;
        setScrolled((prev) => (prev === next ? prev : next));
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
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
            className="flex items-center shrink-0"
            aria-label="Serena Retreat — Home"
          >
            <Image
              src="/images/logo/Serena-logo.webp"
              alt="Serena Retreat"
              width={48}
              height={48}
              priority
              unoptimized
              className="h-12 w-12 object-contain"
            />
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
