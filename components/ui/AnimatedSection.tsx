"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationType = "fade" | "slide-up" | "slide-up-fade" | "scale-fade";

type AnimatedSectionProps = {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
};

const variants: Record<AnimationType, Variants> = {
  "fade": {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-up": {
    hidden:  { y: 32 },
    visible: { y: 0 },
  },
  "slide-up-fade": {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  "scale-fade": {
    hidden:  { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1 },
  },
};

/**
 * Wraps any content with a Framer Motion entrance animation.
 * Per MOTION.md: slow, calm, luxury reveals.
 * Respects prefers-reduced-motion via Framer Motion's built-in behaviour.
 */
export default function AnimatedSection({
  children,
  animation = "slide-up-fade",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  as: Tag = "div",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: "-80px 0px",
  });

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={cn(className)}
      variants={variants[animation]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // --ease-luxury
      }}
    >
      {children}
    </MotionTag>
  );
}
