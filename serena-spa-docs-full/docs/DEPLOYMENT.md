# DEPLOYMENT.md — Deployment Plan

## Environments
- Local development
- Vercel Preview
- Production

## Required Environment Variables
```txt
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
RESEND_API_KEY=
BOOKING_NOTIFY_EMAIL=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
SANITY_PROJECT_ID=
SANITY_DATASET=
SANITY_API_VERSION=
```

## Deployment Steps
1. Push code to GitHub.
2. Connect repository to Vercel.
3. Add environment variables.
4. Deploy preview.
5. Test booking form.
6. Test all mobile pages.
7. Connect domain.
8. Submit sitemap to Google Search Console.

## Pre-Launch Checklist
- [ ] HTTPS active
- [ ] Domain redirects correct
- [ ] Sitemap accessible
- [ ] Robots accessible
- [ ] Booking form works
- [ ] WhatsApp/Zalo links work
- [ ] Phone click works
- [ ] Open Graph preview works
- [ ] Mobile Lighthouse acceptable
