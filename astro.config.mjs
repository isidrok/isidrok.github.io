// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://astro.build/config
export default defineConfig({
  site: "https://isidrok.github.io",
  trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes("draft"),
    }),
  ],
  markdown: {
    remarkPlugins: [[remarkToc, { heading: "Table of Contents", maxDepth: 4 }]],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }],
    ],
    shikiConfig: {
      theme: "dark-plus",
    },
  },
});
