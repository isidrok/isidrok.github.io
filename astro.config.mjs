// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

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
    shikiConfig: {
      theme: "dark-plus",
    },
  },
});
