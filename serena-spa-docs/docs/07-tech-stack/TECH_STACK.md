# Recommended Tech Stack

## Frontend
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion for subtle animation

## UI components
- Custom components built with Tailwind
- Optional: shadcn/ui for form, dialog, select
- lucide-react for icons

## CMS
Recommended: Sanity CMS

Use Sanity for:
- services
- categories
- blog posts
- gallery images
- products later
- localized content later

Alternative:
- Payload CMS if muốn self-host
- MDX if MVP siêu đơn giản

## Forms / booking
MVP options:
1. Resend email notification
2. Telegram bot notification
3. Google Sheet via API/Zapier/n8n
4. WhatsApp/Zalo direct CTA

Recommended MVP:
- Booking form submits to API route
- API route sends email via Resend
- Also saves to Google Sheet or Supabase

## Database
MVP:
- No database required if using email + CMS only

Better:
- Supabase for bookings/customers

## Hosting
- Vercel for frontend
- Sanity hosted studio
- Cloudflare DNS

## Images
- Next/Image
- Cloudflare Images or Sanity image CDN
- WebP/AVIF

## Analytics
- Umami or GA4
- Track events:
  - booking_submit
  - whatsapp_click
  - zalo_click
  - phone_click
  - service_detail_view
  - blog_to_booking_click

## Suggested project setup

```txt
serena-spa/
├── app/
├── components/
├── sanity/
├── lib/
├── data/
├── public/
├── styles/
├── docs/
└── README.md
```
