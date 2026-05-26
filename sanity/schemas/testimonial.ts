import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Guest Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "country", title: "Country", type: "string" }),
    defineField({ name: "countryCode", title: "Country Code (ISO 2)", type: "string", description: "e.g. AU, GB, US, VN" }),
    defineField({ name: "avatar", title: "Avatar", type: "image", options: { hotspot: true } }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (R) => R.required().min(1).max(5) }),
    defineField({ name: "service", title: "Service Received", type: "string" }),
    defineField({ name: "text", title: "Testimonial Text", type: "text", rows: 5, validation: (R) => R.required() }),
    defineField({ name: "source", title: "Source", type: "string", options: { list: ["google", "tripadvisor", "booking", "direct"] } }),
    defineField({ name: "publishedAt", title: "Date", type: "date" }),
    defineField({ name: "isFeatured", title: "Featured", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "name", subtitle: "service" },
  },
});
