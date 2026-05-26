# Suggested Project Structure

```txt
serena-spa/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── services/[slug]/page.tsx
│   │   ├── wellness/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── booking/page.tsx
│   │   ├── booking/success/page.tsx
│   │   ├── contact/page.tsx
│   │   └── privacy-policy/page.tsx
│   ├── api/
│   │   └── bookings/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   ├── ui/
│   ├── home/
│   ├── services/
│   ├── booking/
│   ├── blog/
│   └── shared/
├── data/
│   ├── services.ts
│   ├── navigation.ts
│   └── site.ts
├── lib/
│   ├── seo.ts
│   ├── schema.ts
│   ├── sanity.ts
│   ├── booking.ts
│   └── utils.ts
├── sanity/
│   ├── schemas/
│   └── queries/
├── public/
│   ├── images/
│   ├── icons/
│   └── logo.svg
├── docs/
└── package.json
```
