"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimationType = "fade" | "slide-up" | "slide-up-fade" | "scale-fade";

type AnimatedSectionProps = {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
};

/**
 * Lightweight reveal animation using IntersectionObserver + CSS transitions.
 * Keeps the same API while avoiding heavy animation runtime.
 */
export default function AnimatedSection({
  children,
  animation = "slide-up-fade",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [reducedEffects, setReducedEffects] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isSmallViewport = window.matchMedia("(max-width: 767px)").matches;

    const nav = window.navigator;
    const ua = nav.userAgent;
    const isIPhone = /iPhone/i.test(ua);
    const iosVersionMatch = ua.match(/OS (\d+)_/i);
    const iosMajor = iosVersionMatch ? Number(iosVersionMatch[1]) : null;

    // Conservative fallback for older iPhone/mobile hardware.
    // Keeps subtle fade while avoiding heavier transform reveals.
    const lowPowerDevice =
      (typeof nav.hardwareConcurrency === "number" &&
        nav.hardwareConcurrency > 0 &&
        nav.hardwareConcurrency <= 3) ||
      (isIPhone && iosMajor !== null && iosMajor <= 16);

    setReducedEffects(prefersReducedMotion || (isSmallViewport && lowPowerDevice));
  }, []);

  useEffect(() => {
    if (reducedEffects) {
      setIsInView(true);
      return;
    }

    if (!ref.current) return;
    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { rootMargin: "-80px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, reducedEffects]);

  const animationClass =
    reducedEffects
      ? "reveal-fade"
      : animation === "fade"
      ? "reveal-fade"
      : animation === "slide-up"
        ? "reveal-slide-up"
        : animation === "scale-fade"
          ? "reveal-scale-fade"
          : "reveal-slide-up-fade";

  const effectiveDuration = reducedEffects ? Math.min(duration, 0.22) : duration;
  const effectiveDelay = reducedEffects ? 0 : delay;

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-base",
        reducedEffects && "reveal-reduced",
        animationClass,
        isInView && "reveal-visible",
        className
      )}
      style={{
        transitionDuration: `${effectiveDuration}s`,
        transitionDelay: `${effectiveDelay}s`,
      }}
    >
      {children}
    </div>
  );
}
