# MOTION.md — Animation and Interaction System

## Motion Direction
Soft, slow, calm. The site should feel like breathing, not like a tech product.

## Durations
- Micro hover: 150–220ms
- Dropdown/menu: 220–320ms
- Section reveal: 500–800ms
- Hero image fade: 700–1000ms

## Easing
Use ease-out or custom smooth easing:
`[0.16, 1, 0.3, 1]`

## Allowed Animations
- Fade in
- Soft slide up 12–24px
- Gentle scale 1.02 on image hover
- Card lift 2–4px
- Smooth dropdown reveal
- Subtle parallax on hero image only

## Avoid
- Bounce
- Fast spinning
- Aggressive parallax
- Flashy transitions
- Too many elements animating at once

## Reduced Motion
Respect `prefers-reduced-motion`.
Disable non-essential animations.

## Hover States
Service card hover:
- Image scale 1.03
- Border changes to terracotta with low opacity
- Shadow increases slightly
- CTA text shifts 2px right

Dropdown hover:
- Active item background: soft peach 20–30% opacity
- Icon changes terracotta
