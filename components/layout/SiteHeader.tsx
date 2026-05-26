"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import TopBar from "./TopBar";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import Button from "@/components/ui/Button";

/**
 * SiteHeader — sticky, scroll-aware header.
 * Structure: TopBar → Header (logo | nav | book btn)
 * Per HOME_WIREFRAME.md: solid on scroll, transparent on hero.
 * Scroll behaviour: adds shadow + slight bg tint after 80px.
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-header w-full">
      <TopBar />
      <div
        className={cn(
          "bg-[var(--color-cream)] transition-shadow duration-300",
          scrolled ? "shadow-[var(--shadow-header)]" : ""
        )}
      >
        <div className="container-site flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Serena Spa Hội An — Home"
          >
            {/* Text logo — replace with <Image> when brand logo file is ready */}
            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl md:text-2xl font-light tracking-widest text-[var(--color-espresso)] uppercase">
                Serena
              </span>
              <span className="font-sans text-[9px] md:text-[10px] font-medium tracking-[0.22em] text-[var(--color-terracotta)] uppercase">
                Spa · Hội An
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <MainNav />

          {/* Right side — Book Now + mobile hamburger */}
          <div className="flex items-center gap-3">
            <Button
              href="/booking"
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
            >
              Book Now
            </Button>

            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
