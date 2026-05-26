# Component Specs

## Layout components
- TopInfoBar
- Header
- MobileMenu
- Footer
- SectionHeading
- Container

## Conversion components
- PrimaryButton
- SecondaryButton
- FloatingContactWidget
- StickyMobileCTA
- BookingForm
- MiniBookingCard

## Content components
- HeroSection
- ServiceCard
- ServiceCategoryTabs
- ServiceDropdownMegaMenu
- WellnessPillarCard
- GalleryGrid
- TestimonialCard
- BlogCard
- FAQAccordion
- TrustStrip
- Breadcrumbs

## ServiceCard spec
Props:
- title
- slug
- category
- image
- shortDescription
- duration
- priceFrom
- featured

Hover:
- image scale
- reveal CTA overlay
- border terracotta

## BookingForm spec
Fields:
- service
- date
- time
- guests
- name
- phone
- email optional
- note optional
- language optional

Validation:
- name required
- phone required
- service required
- date required
- time required

Submit states:
- idle
- loading
- success
- error

## Mega menu spec
Services menu:
- left category list
- right list of treatments for hovered category
- promo image/card
- View all services button

Wellness menu:
- Detox & Cleanse
- Mind & Soul
- Holistic Healing
- Wellness Packages
- Couple Retreat
