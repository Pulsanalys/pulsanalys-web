import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://pulsanalys.se",
  trailingSlash: "always",
  build: { format: "directory" },
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
