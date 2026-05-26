# COMPONENT_RULES.md — Component Engineering Rules

## Core Principle
Build a reusable design system, not random page-specific blocks.

## Required Component Groups
### Layout
- SiteHeader
- TopBar
- MainNav
- MobileNav
- Footer
- FloatingContactWidget

### Sections
- HeroSection
- ServiceHighlights
- FeaturedTreatments
- WhyChooseUs
- GalleryPreview
- Testimonials
- BlogPreview
- ContactCTA

### Cards
- ServiceCard
- ProductCard
- BlogCard
- FeatureCard
- TestimonialCard
- GalleryCard

### Forms
- BookingForm
- ContactForm
- NewsletterForm optional

### UI
- Button
- Container
- SectionHeader
- Badge
- Breadcrumbs
- Tabs
- Dropdown
- Modal

## Rules
- Components must receive props, not import page-specific data unless they are page containers.
- Use TypeScript interfaces for props.
- Use Tailwind classes consistently.
- Avoid fixed pixel widths unless needed for icons.
- Components must be responsive by default.
- Components must support keyboard navigation where interactive.
- Do not create multiple button implementations.
- Use `cn()` utility for class composition.

## Naming
- Components: PascalCase.
- Files: kebab-case or PascalCase, choose one and stay consistent.
- Data slugs: lowercase hyphenated.

## Accessibility
- Buttons for actions, links for navigation.
- Add aria labels to icon-only buttons.
- Menus must be keyboard accessible.
- Forms require labels and validation messages.
