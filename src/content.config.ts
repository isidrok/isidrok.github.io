import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; 

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    slug: z.string(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  blog
};

