import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

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

export const collections = { events };
