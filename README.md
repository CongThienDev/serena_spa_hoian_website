# Serena Spa Hoi An Website

Production-grade, bilingual wellness website built with Next.js App Router for a premium spa brand experience.

This project focuses on three priorities:
- visual brand execution (luxury, calm, mobile-first)
- strong technical SEO foundations
- fast page delivery with optimized asset loading

## Highlights

- Bilingual routing (`/en`, `/vi`) with locale-aware metadata
- App Router architecture with reusable section-based page composition
- Performance-oriented image strategy using `next/image`, responsive `sizes`, and LCP prioritization
- SEO-ready metadata system with canonical, Open Graph, Twitter Card, and hreflang alternates
- Structured data support (LocalBusiness + DaySpa schema)
- Conversion-focused UX: sticky booking/contact actions, mobile quick-contact bar, booking funnel pages

## Lighthouse Snapshot

Recent Lighthouse runs (from provided reports):

| Context | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Mobile | 94 | 91 | 100 | 100 |
| Desktop | 100 | 87 | 100 | 100 |

Notes:
- Lighthouse scores naturally vary across runs due to network/CPU simulation and environment conditions.
- For reliable benchmarking, run 5+ tests on the same URL and compare median values.

## SEO Implementation

Implemented SEO capabilities in this codebase include:

- Route-level metadata generation via shared utilities
- Canonical URLs per locale
- `hreflang` alternates for EN/VI + `x-default`
- Open Graph and Twitter metadata for social previews
- Auto-generated `sitemap.xml` and `robots.txt`
- JSON-LD schema support for local business/spa context
- SEO-oriented content architecture for services, blog, and conversion pages

Key SEO files:
- `/Users/lecongthien/Documents/GitHub/serena_spa_hoian_website/lib/metadata.ts`
- `/Users/lecongthien/Documents/GitHub/serena_spa_hoian_website/lib/route-metadata.ts`
- `/Users/lecongthien/Documents/GitHub/serena_spa_hoian_website/app/sitemap.ts`
- `/Users/lecongthien/Documents/GitHub/serena_spa_hoian_website/app/robots.ts`

## Performance Engineering

Core optimizations applied across the frontend:

- Optimized image delivery
  - `next/image` for responsive image generation
  - modern formats (`AVIF`/`WebP`) configured in Next image pipeline
  - LCP hero image marked as high priority
  - viewport-aware `sizes` to avoid over-downloading on mobile
- Reduced JavaScript overhead
  - lightweight reveal/interaction patterns where possible
  - minimized client-side animation/runtime cost in navigation and utility UI
- Reduced render-path bottlenecks
  - scroll-driven state updates throttled via `requestAnimationFrame`
  - attention to render-blocking behavior and critical-request chains

Example observed network footprint from recent profiling:
- ~66 requests
- ~979 kB transferred
- ~2.2 MB total resources

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Zod + React Hook Form (validation/forms)
- Sanity client (content integration)

## Project Structure

- `app/` route tree and layouts
- `components/` reusable UI + page sections
- `data/` content/config dictionaries
- `lib/` metadata, i18n, schemas, utilities
- `public/` static brand/media assets
- `serena-spa-docs-full/` product, UX, SEO, and implementation documentation

## Local Development

```bash
npm install
npm run dev
```

Build and production preview:

```bash
npm run build
npm run start
```

Type-check and lint:

```bash
npm run type-check
npm run lint
```

## Environment Variables

Configure environment values in your deployment platform or local `.env` file.

Common keys used by this project:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
- `RESEND_API_KEY`
- `BOOKING_NOTIFY_EMAIL`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_VERSION`

## Documentation

Extended technical and product documentation is available at:
- `/Users/lecongthien/Documents/GitHub/serena_spa_hoian_website/serena-spa-docs-full/docs`

---

If you are reviewing this repository for portfolio/profile purposes, this project demonstrates end-to-end frontend delivery with measurable SEO and performance outcomes on a real business website.
