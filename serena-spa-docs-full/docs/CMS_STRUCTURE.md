# CMS_STRUCTURE.md — Sanity Content Model

## Site Settings
Fields:
- siteName
- logo
- phone
- whatsapp
- zalo
- kakao
- instagram
- address
- openingHours
- googleMapUrl

## Service Category
Fields:
- title
- slug
- description
- icon
- order

Examples:
- Massage
- Facial Care
- Body Therapy
- Wellness
- Packages

## Service
Fields:
- title
- slug
- category
- shortDescription
- longDescription
- benefits[]
- durationOptions[]
- priceFrom
- images[]
- featured
- addOns[]
- faq[]
- seoTitle
- seoDescription

## Blog Post
Fields:
- title
- slug
- excerpt
- coverImage
- category
- author
- publishedAt
- body
- relatedServices[]
- seoTitle
- seoDescription

## Gallery Item
Fields:
- title
- image
- alt
- category
- order

## Testimonial
Fields:
- name
- country
- rating
- review
- source
- date

## FAQ
Fields:
- question
- answer
- category
