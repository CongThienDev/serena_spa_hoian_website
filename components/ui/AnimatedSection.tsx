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

  useEffect(() => {
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
  }, [once]);

  const animationClass =
    animation === "fade"
      ? "reveal-fade"
      : animation === "slide-up"
        ? "reveal-slide-up"
        : animation === "scale-fade"
          ? "reveal-scale-fade"
          : "reveal-slide-up-fade";

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-base",
        animationClass,
        isInView && "reveal-visible",
        className
      )}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
