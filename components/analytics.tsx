"use client";

// @ts-ignore - @vercel/analytics will be installed during Vercel build
import { Analytics } from "@vercel/analytics/next";

export function AnalyticsProvider() {
  return <Analytics />;
}
