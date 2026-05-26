# ARCHITECTURE.md — Next.js Architecture

## Framework
Next.js App Router with TypeScript.

## Recommended App Structure
```txt
app/
├── (site)/
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── services/[category]/page.tsx
│   ├── services/[category]/[slug]/page.tsx
│   ├── wellness/page.tsx
│   ├── booking/page.tsx
│   ├── gallery/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── contact/page.tsx
│   └── faq/page.tsx
├── api/
│   └── booking/route.ts
├── sitemap.ts
├── robots.ts
├── layout.tsx
└── globals.css
```

## Source Structure
```txt
src/
├── components/
│   ├── layout/
│   ├── sections/
│   ├── cards/
│   ├── forms/
│   ├── ui/
│   └── seo/
├── data/
├── lib/
├── sanity/
├── styles/
└── types/
```

## Server vs Client Components
Server by default:
- Pages
- Static sections
- SEO metadata
- Service data rendering

Client only:
- Mobile nav
- Dropdown mega menu
- Booking form
- Floating contact widget if interactive
- Carousels
- Language switcher

## Data Strategy MVP
Start with typed local data files:
- `src/data/services.ts`
- `src/data/blog.ts`
- `src/data/site.ts`

Then migrate to Sanity CMS once design and data model are stable.

## Caching
- Static pages where possible.
- Revalidate CMS content every 60–300 seconds in production.
- Booking API must not be cached.

## Error Handling
- Custom 404 page.
- Booking form should show clear success/error states.
- Log server errors without exposing secrets.
