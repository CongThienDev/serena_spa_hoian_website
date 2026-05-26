/**
 * Sanity Schema — Service
 * Per CMS_STRUCTURE.md: Service schema definition.
 * Phase 9: wire up to GROQ queries to replace data/services.ts.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "pricing", title: "Pricing" },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Service Name",
      type: "string",
      group: "content",
      validation: (R) => R.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "serviceCategory" }],
      group: "content",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "content",
      description: "Short descriptive line shown under the service name",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      group: "content",
    }),
    defineField({
      name: "duration",
      title: "Duration Options (minutes)",
      type: "array",
      of: [{ type: "number" }],
      group: "pricing",
      description: "e.g. [60, 90, 120]",
    }),
    defineField({
      name: "priceUSD",
      title: "Price (USD)",
      type: "number",
      group: "pricing",
    }),
    defineField({
      name: "priceVND",
      title: "Price (VND)",
      type: "number",
      group: "pricing",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt Text", validation: (R) => R.required() }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt Text" }),
          ],
        },
      ],
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
    }),
    defineField({
      name: "includes",
      title: "What's Included",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
    }),
    defineField({
      name: "isSignature",
      title: "Signature Service",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "isFeatured",
      title: "Featured on Homepage",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description: "Override the page <title>. Max 60 characters.",
      validation: (R) => R.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      group: "seo",
      rows: 3,
      description: "Meta description. 120–160 characters.",
      validation: (R) => R.max(160),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      media: "coverImage",
    },
  },
});
