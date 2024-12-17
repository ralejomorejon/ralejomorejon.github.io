import { defineCollection, z } from "astro:content";
import { date } from "astro:schema";

const cards = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    img: z.string(),
    date: z.string(),
    buy: z.object({
      spain: z.string().url(),
      usa: z.string().url(),
    }),
  }),
});

export const collections = { cards };
