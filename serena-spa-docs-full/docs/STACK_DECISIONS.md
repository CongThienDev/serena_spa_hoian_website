# STACK_DECISIONS.md — Technology Decisions

## Frontend: Next.js
Reason:
- Strong SEO
- App Router supports server rendering
- Easy Vercel deployment
- Great image optimization

## Language: TypeScript
Reason:
- Prevents data and prop errors
- Better maintainability with AI coding agents

## Styling: Tailwind CSS
Reason:
- Fast UI iteration
- Consistent design tokens
- Easy responsive styling

## Animation: Framer Motion
Reason:
- Smooth premium transitions
- Good component-level animation control

## CMS: Sanity
Reason:
- Flexible content model
- Good for services, blog, gallery, FAQs
- Easy multilingual expansion

## Forms: React Hook Form + Zod
Reason:
- Reliable validation
- Good UX
- Type-safe form data

## Hosting: Vercel
Reason:
- Best Next.js deployment path
- Preview deployments
- Easy environment variables

## Analytics: Umami or GA4
Recommendation:
- Umami if privacy/simple dashboard matters.
- GA4 if running ads and Google ecosystem is needed.

## Booking Notifications
MVP:
- Email via Resend or Telegram bot.
Future:
- Google Sheet + CRM + WhatsApp automation.
