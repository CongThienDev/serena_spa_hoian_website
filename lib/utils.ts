import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely — handles conflicts and conditionals.
 * Use everywhere in place of raw className string concatenation.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price number as Vietnamese Dong or USD
 */
export function formatPrice(
  amount: number,
  currency: "VND" | "USD" = "USD"
): string {
  if (currency === "VND") {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format duration in minutes to human-readable string
 * e.g. 90 → "90 min" | 120 → "2 hrs"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hrs} hr${hrs > 1 ? "s" : ""}`;
  return `${hrs} hr ${mins} min`;
}

/**
 * Generate a URL-safe slug from a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Truncate text to maxLength with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Get absolute URL for canonical links and OG images
 */
export function absoluteUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://serenaretreat.com";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
