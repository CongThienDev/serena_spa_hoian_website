# Color & Typography Specs

## Color palette đề xuất

```css
:root {
  --color-primary: #C96F3D;        /* terracotta orange, dùng cho CTA */
  --color-primary-dark: #9A4B2C;   /* hover, text accent */
  --color-secondary: #E8B088;      /* peach */
  --color-bg: #FFF8F2;             /* warm cream */
  --color-bg-soft: #FCEDE3;        /* soft peach background */
  --color-card: #FFFFFF;           /* cards */
  --color-border: #EBC7B2;         /* soft border */
  --color-heading: #4A2418;        /* dark brown */
  --color-text: #5F4438;           /* warm body text */
  --color-muted: #9B7A6B;          /* muted text */
  --color-success: #4F8A5B;        /* natural green accents */
}
```

## Tailwind theme suggestion

```ts
colors: {
  cream: '#FFF8F2',
  peach: '#FCEDE3',
  terracotta: '#C96F3D',
  terracottaDark: '#9A4B2C',
  sand: '#E8B088',
  brown: '#4A2418',
  mutedBrown: '#5F4438',
  borderPeach: '#EBC7B2',
}
```

## Font đề xuất

### Heading font
- `Cormorant Garamond` hoặc `Playfair Display`
- Dùng cho H1, H2, section title
- Feel: luxury, editorial, spa premium

### Body font
- `Inter`, `Lato`, hoặc `Manrope`
- Dùng cho mô tả, form, navigation
- Feel: clean, modern, dễ đọc

### Script accent optional
- `Allura` hoặc `Parisienne`
- Chỉ dùng rất ít cho slogan ngắn như “A Place To Glow” hoặc decorative quote
- Không dùng cho paragraph dài

## Font scale desktop

```css
H1: 64–80px, line-height 0.95–1.05
H2: 40–52px
H3: 24–32px
Body: 16px
Small: 13–14px
Button: 14–16px, uppercase/medium weight
```

## Font scale mobile

```css
H1: 40–48px
H2: 30–36px
H3: 22–26px
Body: 15–16px
Small: 13px
```

## UI shape
- Border radius card: 20–28px
- Button radius: full pill / 999px
- Input radius: 10–14px
- Shadow: very soft

## CTA style
Primary button:
- background terracotta
- text white
- icon calendar/leaf
- hover: darker terracotta + slight translateY(-1px)

Secondary button:
- transparent / cream
- border terracotta
- text terracotta
- hover: soft peach background
