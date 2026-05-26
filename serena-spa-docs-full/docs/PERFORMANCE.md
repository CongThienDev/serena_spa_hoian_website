# PERFORMANCE.md — Performance Requirements

## Goals
- Mobile Lighthouse Performance: 85+
- Accessibility: 90+
- SEO: 95+
- LCP under 2.5s on good mobile connection
- CLS under 0.1

## Image Rules
- Use next/image.
- Hero image must be optimized and sized correctly.
- Use WebP/AVIF when possible.
- Lazy load below-the-fold images.
- Do not use huge uncompressed PNGs for photos.

## Font Rules
- Use next/font.
- Limit font weights.
- Avoid too many font families.

## JavaScript Rules
- Keep client components minimal.
- Avoid heavy carousel libraries unless needed.
- Framer Motion only where useful.

## CSS Rules
- Tailwind only.
- Remove unused large CSS.

## Analytics
- Load analytics after page interactive where possible.

## Testing
Run:
- Lighthouse
- WebPageTest optional
- Real mobile browser testing
