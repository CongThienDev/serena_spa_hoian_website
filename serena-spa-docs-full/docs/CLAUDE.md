# CLAUDE.md — Serena Spa Hoi An Website Agent Guide

This file is the operating manual for Claude Code and any AI coding agent working on this repository.

## Project Summary
Build a premium wellness spa website for **Serena Spa Hoi An**. The website must feel calm, warm, elegant, and trustworthy. It should convert tourists into bookings via WhatsApp/Zalo/phone and support SEO for spa-related keywords in Hoi An.

## Brand Vibe
- Luxury wellness, not cheap promotion.
- Warm peach, terracotta, beige, cream, soft wood tones.
- Minimal, spacious, serene, resort-like.
- Visual references: Aman, Six Senses, Banyan Tree, Japandi spa interiors.
- Emotional keywords: calm, healing, glow, sanctuary, balance, premium relaxation.

## MVP Goal
Create a fast, mobile-first website that includes:
- Home
- About
- Services overview
- Service detail
- Wellness / packages
- Booking
- Gallery
- Blog listing
- Blog detail
- Contact
- Policy pages

## Tech Stack
Use:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Sanity CMS or local content layer during MVP
- React Hook Form + Zod
- Resend / Telegram webhook / Google Sheet for booking notifications
- Vercel hosting
- Umami or GA4 analytics

## Coding Principles
- Mobile-first always.
- Server Components by default.
- Client Components only for interaction: menu, booking modal, language switcher, carousel, form.
- Reusable components only.
- Avoid one-off duplicated layouts.
- Avoid inline styles unless absolutely necessary.
- Use semantic HTML.
- All buttons and links must have accessible names.
- All images must have descriptive alt text.
- Use `next/image` for all local and CMS images.

## Design Rules
- Use generous spacing.
- Use rounded cards, soft shadows, thin borders.
- No harsh black. Use deep espresso brown.
- No neon colors.
- Use soft hover states: translate up 2px, shadow increase, terracotta border.
- Animation must be slow, calm, and subtle.

## SEO Rules
- Every page needs title, description, canonical, Open Graph.
- Service detail pages are SEO landing pages.
- Use LocalBusiness / Spa schema.
- Use Article schema for blogs.
- Use FAQ schema where relevant.
- Keep clean URLs.
- Never create random slugs.

## Do Not Do
- Do not introduce a different design style.
- Do not use dark luxury black/gold styling.
- Do not add complex payment or login in MVP.
- Do not hardcode business content in too many components; prefer data files or CMS.
- Do not break mobile booking flow.

## Primary Conversion Actions
1. Book Now
2. WhatsApp / Zalo click
3. Phone call
4. Contact form submit
5. Service detail view

## Current Build Priority
1. Set up app architecture and design tokens.
2. Build layout, header, footer, floating contact widget.
3. Build homepage.
4. Build services overview and detail pages.
5. Build booking form.
6. Build SEO metadata and schema.
7. Build blog and contact.
