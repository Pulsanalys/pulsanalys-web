import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://pulsanalys.se",
  trailingSlash: "always",
  build: { format: "directory" },
  i18n: {
    locales: ["sv", "en"],
    defaultLocale: "sv",
    routing: { prefixDefaultLocale: false },
  },
});
