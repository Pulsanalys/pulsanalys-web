import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://pulsanalys.se",
  trailingSlash: "always",
  integrations: [sitemap({ i18n: { defaultLocale: "sv", locales: { sv: "sv-SE", en: "en-GB" } } })],
  build: { format: "directory", inlineStylesheets: "always" },
  vite: {
    // Lightning CSS folds animation-timeline into the animation shorthand, which browsers
    // then reject. esbuild keeps the longhands.
    build: { cssMinify: "esbuild" },
  },
  i18n: {
    locales: ["sv", "en"],
    defaultLocale: "sv",
    routing: { prefixDefaultLocale: false },
  },
});
