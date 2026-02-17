import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const TAG = z.enum([
  "node.js",
  "javascript",
  "streams",
  "ai",
  "llm",
  "computer-vision",
  "web",
  "productivity",
  "performance",
]);

const blog = defineCollection({
  loader: glob({ pattern: "*/*.{md,mdx}", base: "./src/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    slug: z.string(),
    tags: z.array(TAG).max(4).optional(),
    draft: z.boolean().optional(),
    repository: z.string().url().optional(),
    liveDemo: z.string().url().optional(),
  }),
});

export const collections = {
  blog,
};
