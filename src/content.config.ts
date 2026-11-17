import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const seo = {
  /** Shown in search results; at most about 155 characters. */
  description: z.string().max(170),
};

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    type: z.enum(["grundutbildning", "fordjupningskurs", "forelasning", "event"]),
    /** Event id in the old WordPress booking system, for redirects from /anmalan/?eventid=N. */
    legacyId: z.number().int().optional(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    time: z.string(),
    place: z.string(),
    price: z.string(),
    terms: z.string(),
    leader: z.object({ name: z.string(), phone: z.string() }),
    booking: z.enum(["bindande", "intresseanmalan"]),
  }),
});

/** Personprofil, Teamprofil, Rekryteringsprofil, 360-profil. */
const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    order: z.number(),
    tagline: z.string(),
    ...seo,
    summary: z.string(),
    photo: image(),
    alt: z.string(),
    uses: z.array(z.string()),
    stepsTitle: z.string(),
    steps: z.array(z.string()),
  }),
});

/** Grundutbildning DISC, Fördjupning DISC, Ledarskapsutbildning. */
const courses = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/courses" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    order: z.number(),
    tagline: z.string(),
    ...seo,
    summary: z.string(),
    photo: image(),
    alt: z.string(),
    price: z.string().optional(),
    /** Which kind of dated event books this course. */
    eventType: z.enum(["grundutbildning", "fordjupningskurs", "forelasning", "event"]).optional(),
    bookingPage: z.string(),
    programme: z.array(z.object({ title: z.string(), items: z.array(z.string()) })),
  }),
});

/** Text pages rendered by one template. */
const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    heading: z.string(),
    ...seo,
    lead: z.string().optional(),
    photo: image().optional(),
    alt: z.string().optional(),
    /** Show a group of people from the people collection after the text. */
    people: z.enum(["team", "konsult", "distributor"]).optional(),
    peopleHeading: z.string().optional(),
    /** Questions and answers, rendered as a list and as FAQPage structured data. */
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    ...seo,
    summary: z.string(),
    photo: image().optional(),
    alt: z.string().optional(),
    legacyPath: z.string(),
  }),
});

const people = defineCollection({
  loader: file("src/content/data/people.json"),
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.string(),
    email: z.string().optional(),
    phone: z.string().optional(),
    linkedin: z.string().url().optional(),
    photo: image().optional(),
    group: z.enum(["team", "kontakt", "konsult", "distributor"]),
    area: z.string().optional(),
    order: z.number(),
  }),
});

const testimonials = defineCollection({
  loader: file("src/content/data/testimonials.json"),
  schema: z.object({
    name: z.string(),
    org: z.string().optional(),
    text: z.string(),
    /** Shorter version for the homepage, made of whole sentences from the quote. */
    short: z.string().optional(),
    home: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = { events, products, courses, pages, posts, people, testimonials };
