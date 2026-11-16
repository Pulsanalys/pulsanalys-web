# Defects on the current site

Found during the crawl on 16 November 2026. Severity: **Critical** (breaks a task or
shows an error), **High** (visible error or misleading), **Medium**, **Low**.
Every item is fixed in the rebuild unless marked *decision*.

## 1. Errors and broken flows

| # | Where | Defect | Severity |
|---|---|---|---|
| 1.1 | `/bokning/`, `/anmalan/`, `/abonnemangsresultat/`, `/events/`, `/en/booking/`, `/en/subscription-results/` | WordPress "Det har uppstått ett kritiskt fel" (HTTP 500). All are in the sitemap and indexed | Critical |
| 1.2 | `/skaffa-abonnemang/`, `/cvgeneratorn/` | Questionnaire plugin gone; the raw shortcode `[modalsurvey id="1994235982" …]` is shown to visitors | Critical |
| 1.3 | Blog post `/2021/04/29/…` | Raw shortcode `[wof_wheel id="6328"]` printed on the page | High |
| 1.4 | `/foretag/`, `/en/companies/` | Page is 8× Lorem ipsum | High |
| 1.5 | `/webbinarier/`, `/utbildningar-och-forelasningar/`, `/en/lectures/` | Empty list shows the English plugin text "No data was found" | High |
| 1.6 | Event 531 (`/anmalan/?eventid=531`) | Heading says 26–27 November; body says "hålls 2026-11-18 – 2026-11-18" | High |
| 1.7 | `/vad-ar-pulsanalys/` | Tells visitors to "klicka på telefonen i skärmens nederkant"; no such button exists | Medium |
| 1.8 | Cookie notice | "Läs mer" links to `#` | Medium |
| 1.9 | `/events/aw-mingel/` | Empty page titled "Mingel" | Low |
| 1.10 | `/studenter/` | Counter shows "0+ Studenter" | Medium |

## 2. Broken internal links

| Link | Found on | Fix |
|---|---|---|
| `/inspirationsforelasningar/` (404) | `/` (2×), `/konsulttjanster/`, Jan 2021 newsletter | → `/webbinarier/` |
| `/utbildningar-och-inspirationsforelasningar/` (404) | Footer "Anmäl dig här" on every page | → `/utbildningar-och-forelasningar/` |
| `/pulsanalys2019/pulscertifiering-disc/` (404) | `/distributor/`, `/en/become-a-distributor/` | → `/grundutbildning-disc/` |
| `/en/basic-disc-course/` (404) | `/en/`, `/en/courses/` | → `/en/basic-disc-training/` |
| `/en/basic-course/` (404) | `/en/`, `/en/basic-disc-training/`, `/en/immersion-disc/` | → English dates page |
| `/en/what-is-pulsanalys/` (404) | `/en/` | → new English slug |
| `/basic-courses/` (404) | `/en/training-courses-and-lectures/` | → English dates page |
| `/pulsanalys2019/grundutbildning-disc/`, `/grundutbildning`, `/om-oss` | several | Work only through redirects; link directly |

External links (LinkedIn, Facebook, Instagram, Spotify, clientarea) could not be checked
from the browser: those sites hide their status from cross-site requests. They will be
checked in the link test of the new build.

## 3. Content consistency (*decision* items go to Hussein at the gate)

| # | Defect |
|---|---|
| 3.1 | **Two visiting addresses.** Desktop shows Wollmar Yxkullsgatan 7, 118 50 Stockholm; tablet and `/en/contact-us/` show The Park Södra, Magnus Ladulåsgatan 1, 118 63 Stockholm. *Decision: which is current?* |
| 3.2 | `/om-oss/` meta description says the company is on Åland and in China; the page body does not. *Decision.* |
| 3.3 | Ewa Gadomska (Regionansvarig Polen/UAE) is on `/kontakta-oss/` but hidden on every screen size. *Decision: show or remove.* |
| 3.4 | Name spellings differ between pages: Jessica Hill Holm / Jessica Hillholm; Catharina Byberg / Catarina Byberg. *Decision: correct spelling.* |
| 3.5 | Tommy Smedberg's company is "Wästbygg" on the home page and missing on `/omdomen/`. Linda Hanserius (Järfälla kommun) is on the home page only |
| 3.6 | The Anders Wiklund (Åda AB) "testimonial" is a sentence from a recruitment announcement, not a review. *Decision: keep or drop.* |
| 3.7 | Two privacy policies in English (`/en/privacy-policy/`, `/en/privacy-policy-2/`) and one English policy on a Swedish URL (`/privacy-policy/`) |
| 3.8 | `/faq/` shows the same question three times |
| 3.9 | `/grundutbildning/` prints the same intro paragraph twice; `/event/` shows the course intro under the events intro |
| 3.10 | The two distributor/consultant lists (`/distributor/` – 10 names; `/konsulter/` – 5 names, orphan) overlap but differ. *Decision: which list is current?* |
| 3.11 | Booking form "Referens" lists Per Kristensen and Dan Morast, who appear nowhere else on the site |
| 3.12 | Jan 2021 newsletter contains a placeholder: "på vår hemsida XX" |
| 3.13 | Fördjupningskurs: no price on the course page; the 25 Nov event page says "Kostnadsfritt" |

## 4. Claims the new copy must handle carefully

The brief allows no new claims. These are existing claims; the project rules (K08)
also bar unsupported validity claims. *Decision: keep as written, soften, or remove.*

| Page | Claim |
|---|---|
| `/vad-ar-pulsanalys/` | "Validiteten är mycket hög" |
| `/vad-ar-disc/` | "DISC-teorin är ett av världens mest använda redskap för att skapa personprofiler" |
| `/om-oss/` | "PulsAnalys AB äger de internationella rättigheterna för systemet" |
| `/konsulttjanster/` | "Team-dagar är en av våra populäraste konsulttjänster" |
| Home | Client logos (AstraZeneca, Jönköping Energi, Finansförbundet, ICA Maxi, Barilla, OX2). The project rules require written consent for logos; they are already published. *Decision: keep.* |

## 5. Swedish language errors

| Page | Current | Correct |
|---|---|---|
| Home (testimonial) | PulsAnalays | PulsAnalys |
| `/teamprofil/`, `/rekryteringsprofil/` | utvecklings områden | utvecklingsområden |
| `/360-profil/` | individenen | individen |
| `/360-profil/` | så skattar men en medarbetare | så skattar man en medarbetare |
| `/ledarskapsutbildning/` | din egna personprofil | din egen personprofil |
| `/ledarskapsutbildning/` | vart befinner sig ditt team | var befinner sig ditt team |
| `/webbinarier/` | Vill du gå på våra webbinarium? | … våra webbinarier? |
| Footer form, booking form | E-postaddress | E-postadress |
| Home (testimonial) | grupp-och individnivå | grupp- och individnivå |
| Meta descriptions (home, `/vad-ar-pulsanalys/`, `/om-oss/`, `/grundutbildning-disc/`) and event 534 | DiSC | DISC (DiSC is a competitor's trademark spelling) |
| Several | Pulsanalys / PulsAnalys / Pulsprofiler / Puls-systemet | PulsAnalys, PulsAnalys AB, PulsAnalys DISC |
| Headings | "NU ÄVEN ONLINE", "Kommande Grundutbildningar DISC", "Kommande Föreläsningar" | Sentence case |
| Throughout | skall, c:a, o.s.v., t.ex. mixed with "till exempel", "Mejladress" vs "E-post" | Consistent modern style (handled in COPY-REVIEW) |
| Throughout | Mixed "du", "ni" and "er" address | Consistent "du" |
| `/kontakta-oss/` description | "Vårt huvudkontor är beläget i vår vackra huvudstad" | Copy review |

## 6. English (machine translation)

- Brand written as **PulsAnalysis** (home, courses, basic training, consulting, distributor, reviews), **Pulse Analysis** (home testimonials) and **Pulse Profiles**.
- Course name "Fördjupning DISC" rendered as **"Immersion DISC"**; "Grundutbildning" as **"basic education"**.
- Swedish left untranslated: menu "Anmäl dig här"; event titles "Grundutbildning DISC", "Fördjupningskurs DISC"; buttons "Anmäl dig".
- Testimonials machine-translated (they are quotes; the English site should either show the Swedish original or mark them as translations – *decision*).
- Literal phrasing throughout ("you will make visible a person's salient strengths").
- The brief requires English rewritten from the approved Swedish, so the current English is not used as a source.

## 7. Technical and SEO

| # | Defect | Severity |
|---|---|---|
| 7.1 | No page has an H1 (the only H1 on the whole site is on the empty "Mingel" page) | High |
| 7.2 | Missing meta descriptions: `/ledarskapsutbildning/`, `/faq/`, `/event/`, `/blogg/`, all blog posts, all orphans | Medium |
| 7.3 | Titles are all "Page - PulsAnalys DISC" with no keyword or benefit | Medium |
| 7.4 | About 200 past event pages indexed through nine custom post type sitemaps, including Polish courses from 2022 | High |
| 7.5 | Sitemap lists most pages twice (sv and en share one sitemap without the `/en/` prefix) | Medium |
| 7.6 | Alt text is a file name or a keyword ("pulsanalys-50", "IMG_7074", "distributör" on a blue circle) or empty | High (accessibility) |
| 7.7 | Link text "Klicka här!" and "Läs mer" without context, repeated up to 8 times on the home page | High (accessibility) |
| 7.8 | Slow: home page TTFB ≈ 2.4 s, LCP ≈ 4.3 s measured on a desktop connection; 98 requests, 33 scripts, 24 stylesheets, 230 KB HTML | High |
| 7.9 | Images not optimised: `talent_wins_games.png` 2.7 MB, `julklapp_januari_2021.png` 1 MB, PNG photos, no WebP/AVIF | Medium |
| 7.10 | Roboto and Roboto Slab loaded from Google Fonts in 18 weights each and never used. Loading Google Fonts from Google's servers sends visitor IP addresses to Google | High (privacy, speed) |
| 7.11 | WordPress 5.6.x – end of life, no security updates | High (security) |
| 7.12 | Two multilingual plugins active (Polylang switcher and WPML flag images) | Low |
| 7.13 | Author archive exposes the admin user name `paul070707` | Medium (security) |
| 7.14 | Cookie notice uses implied consent ("Genom att fortsätta accepterar du"). No analytics or ad scripts were found, so the notice may be unnecessary; the privacy policy describes consent that is never collected | Medium (legal – flag) |
| 7.15 | Privacy policy refers to "Datainspektionen" (now IMY) and "Dataskyddslagen"; does not name the form tools, hosting or embedded Google Maps | Medium (legal – flag) |
| 7.16 | Google Maps iframe on `/kontakta-oss/` loads without consent | Medium (privacy) |
| 7.17 | Favicon is a single 300×300 PNG; no SVG, Apple touch icon or manifest | Low |
| 7.18 | Forms send personal data to WordPress with no visible privacy notice next to the form | Medium |
| 7.19 | Booking form has no spam protection; the AJAX handler `events/ajax/ajax.php` shows `alert("ERROR: …")` on failure | Medium |
| 7.20 | Elementor duplicates content for desktop/tablet/mobile (two address blocks, three FAQ copies), which also confuses screen readers | Medium |

## 8. Theme leftovers

- Astra icon font, Elementor icon font (eicons), Font Awesome 5 (two copies) all loaded.
- Elementor share-button config for Google+, StumbleUpon, Digg, Tumblr and others.
- Cart settings in the Essential Addons config (no shop exists).
- Templately library sitemap and an empty landing-page sitemap.
- Flags from WPML on a Polylang site.
- "PulsAnalys AB © 2026. All Rights Reserved" in English on the Swedish footer.
