# GLOBAL_STATES.md — UI State Plan

## States Needed
- Mobile navigation open/closed
- Service mega menu open/closed
- Wellness mega menu open/closed
- Booking modal/drawer open/closed
- Selected booking service
- Selected language
- Contact widget expanded/collapsed on mobile

## Recommended Implementation
Use local component state for simple UI.
Use URL params for shareable filters if needed.
Avoid global state library for MVP.

## Booking State
Booking form can receive prefilled service props from:
- Service detail page
- Service card CTA
- Header booking button

## Language State
MVP can use route-based locale later:
- `/en`
- `/vi`
- `/ko`

For first version, use an EN selector UI but implement actual i18n in a later phase if content is not ready.
