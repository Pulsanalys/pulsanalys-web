// Writes the files whose content depends on the environment:
// on the review address (PUBLIC_STAGING=true) every page is noindex and robots.txt blocks crawling.
import { readFile, writeFile } from "node:fs/promises";

const staging = process.env.PUBLIC_STAGING === "true";
const site = (process.env.SITE_URL ?? "https://pulsanalys.se").replace(/\/$/, "");

if (staging) {
  // Same block as the security headers: a second "/*" block would replace the first.
  const headers = await readFile("dist/_headers", "utf8");
  if (!headers.startsWith("/*\n")) throw new Error("dist/_headers must start with a /* block");
  await writeFile("dist/_headers", headers.replace("/*\n", "/*\n  X-Robots-Tag: noindex, nofollow\n"));
}
await writeFile(
  "dist/robots.txt",
  staging ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap-index.xml\n`,
);
console.log(`postbuild: ${staging ? "staging (noindex)" : "production"}`);
