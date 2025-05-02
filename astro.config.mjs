// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://isidrok.com",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: {
        name: "custom",
        type: "dark",
        colors: {
          "editor.background": "#1b1e28",
          "editor.foreground": "#a7b0c0",
        },
        tokenColors: [
          {
            scope: ["keyword", "storage.type", "storage.modifier"],
            settings: { foreground: "#c678dd" },
          },
          {
            scope: [
              "entity.name.function",
              "support.function",
              "meta.function-call",
              "variable.function",
            ],
            settings: { foreground: "#61afef" },
          },
          {
            scope: ["string", "string.template"],
            settings: { foreground: "#98c379" },
          },
          {
            scope: ["constant.numeric"],
            settings: { foreground: "#e5c07b" },
          },
          {
            scope: ["comment"],
            settings: { foreground: "#7f848e", fontStyle: "italic" },
          },
          {
            scope: [
              "keyword.operator",
              "punctuation.separator",
              "punctuation.terminator",
            ],
            settings: { foreground: "#a7b0c0" },
          },
          {
            scope: ["punctuation.definition.template-expression"],
            settings: { foreground: "#c678dd" },
          },
          {
            scope: ["variable", "meta.definition.variable"],
            settings: { foreground: "#61afef" },
          },
          {
            scope: ["constant.language"],
            settings: { foreground: "#e5c07b" },
          },
          {
            scope: ["entity.name.type.class", "entity.name.class"],
            settings: { foreground: "#e5c07b" },
          },
        ],
      },
    },
  },
});
