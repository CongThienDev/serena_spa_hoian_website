# DESIGN_SYSTEM.md — Serena Spa Visual System

## Visual Direction
Warm wellness luxury. Minimal, clean, calm, spacious, feminine but not overly decorative.

## Color Palette
Use these as Tailwind design tokens.

```ts
colors: {
  cream: '#FFF8F1',
  warmWhite: '#FFFCF8',
  sand: '#F4E7DA',
  softPeach: '#F3C29E',
  peach: '#E9A06F',
  terracotta: '#D97845',
  deepTerracotta: '#B85F32',
  clay: '#A86E55',
  walnut: '#6B3E2E',
  espresso: '#3B2118',
  mutedBrown: '#8B6A5B',
  borderWarm: '#E9D6C6'
}
```

## Usage
- Background: cream / warmWhite.
- Section surface: sand with opacity.
- Primary CTA: terracotta → deepTerracotta hover.
- Text heading: espresso / walnut.
- Body text: mutedBrown.
- Border: borderWarm.

## Typography
Recommended:
- Heading: `Cormorant Garamond` or `Playfair Display`.
- Body: `Inter` or `Nunito Sans`.
- Accent script only for small decorative text: optional, not required.

## Type Scale
Desktop:
- Hero H1: 64–84px, line-height 0.95–1.05
- Page H1: 48–64px
- Section title: 36–48px
- Card title: 20–24px
- Body: 16px
- Small: 13–14px

Mobile:
- Hero H1: 40–48px
- Page H1: 34–42px
- Section title: 28–34px
- Body: 15–16px

## Layout
- Max content width: 1200–1280px.
- Section padding desktop: 96px vertical.
- Section padding mobile: 56px vertical.
- Grid gap: 24px desktop, 16px mobile.

## Border Radius
- Buttons: 999px or 16px depending context.
- Cards: 20–28px.
- Images: 20–28px.
- Modals/dropdowns: 24px.

## Shadows
Use soft warm shadows only:
- `0 12px 40px rgba(107, 62, 46, 0.08)`
- `0 20px 60px rgba(107, 62, 46, 0.12)`

## Buttons
### Primary
Terracotta background, white text, rounded pill, icon left optional.

### Secondary
Transparent/cream background, terracotta border, terracotta text.

### Ghost
No border, muted brown text, terracotta hover.

## Cards
Service cards:
- Image top 16:10
- White/cream surface
- Thin warm border
- Price and duration icons
- CTA text link

## Icons
Use thin-line icons, terracotta stroke. Avoid filled heavy icons.

## Imagery
- Warm spa room photos.
- Soft candle/oil/towel details.
- Avoid stock photos that feel clinical.
- Use real Serena Spa interior images whenever possible.
