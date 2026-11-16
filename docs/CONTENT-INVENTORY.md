# Content inventory – pulsanalys.se

Crawled 16 November 2026 from the public site, page by page, in both languages.
Source of the URL list: the Yoast sitemaps (`/sitemap_index.xml`, 17 sub-sitemaps),
the header, footer and in-page links, and the Polylang `hreflang` pairs on every page.
The site did not block the crawl.

Platform: WordPress 5.6 (outdated), Astra theme, Elementor + Elementor Pro, JetEngine,
Jet Elements, Essential Addons, Piotnet Addons, WPForms Lite, Polylang (WPML flag
images also loaded), Yoast SEO, and a custom PHP booking system under `/events/`.

Verbatim body text is not copied into this file by hand. It is captured
automatically into `archive/` by `tools/archive/` (see ASSET-GAPS.md), so the
copy work starts from the exact source and not from a transcription.

Legend for status: **Live** = linked from the menu or footer. **Orphan** = reachable
and indexed, but not linked from the menu. **Broken** = error or placeholder.

---

## 1. Global elements (every page)

| Element | Content |
|---|---|
| Header | Logo (PNG 653×183) → `/`. Menu: Produkter (Personprofil, Teamprofil, Rekryteringsprofil, 360-profil, Konsulttjänster) · Kurser (Grundutbildning DISC, Fördjupning DISC, Ledarskapsutbildning) · Anmäl dig här (Grundutbildningar, Webbinarier, Fördjupningskurser, Events) · Mer (Om oss, Kontakta oss, Omdömen, Bli distributör, Vad är DISC, Blogg, Integritetspolicy) · **Logga in** → `https://clientarea.pulsanalys.com/` · language switcher (sv/en flags) |
| Footer contact block | H: "Vill ni veta mer? / Kom i kontakt med oss". Text: "Kom i kontakt med oss så berättar vi om hur våra lösningar kan hjälpa er." Phone 070-676 23 75, info@pulsanalys.se. **Form** (WPForms #9502): Namn*, Telefonnummer, E-postadress*, button "Skicka" |
| Footer links | Hem, Produkter, Anmäl dig här, Kurser, Skaffa abonnemang, Om oss, Kontakta oss, Bli distributör, Omdömen, Integritetspolicy |
| Footer details | Wollmar Yxkullsgatan 7, 118 50 Stockholm · info@pulsanalys.se · support@pulsanalys.se · Facebook, LinkedIn, Instagram · "PulsAnalys AB © 2026. All Rights Reserved" |
| Cookie notice | Elementor popup: "Vi använder cookies för att ge dig en bättre upplevelse av webbplatsen samt för statistik. Genom att fortsätta accepterar du att cookie används." Links: "Läs mer" (→ `#`, dead), "Jag förstår" |
| Popup "Bli uppringd av oss!" | Elementor popup #5824. Fields: Namn*, Företag, Mejladress*, Mobilnummer*, Ärende*, button "Ring mig!". Its trigger could not be reproduced; its markup renders inline at the bottom of blog posts |
| Favicon | `logo-300x300.png` / `logo-100x100.png` |

Brand colours in use: navy `#2E3E60` (headings, buttons), warm grey `#8F8685` (body), white.
Fonts in use: Avenir Book / Medium / Black (self-hosted .woff), Montserrat, plus Roboto
and Roboto Slab loaded in 18 weights each from Google Fonts.

---

## 2. Swedish pages – live

### `/` Hem
- **Purpose:** front door; routes to courses, lectures, distributor, products; shows upcoming course dates and testimonials.
- **Title / description:** "Hem - PulsAnalys DISC" / "PulsAnalys är ett effektivt och enkelt verktyg för att göra dina DiSC-personprofiler. Den lyfter fram dina styrkor och motivationsfaktorer."
- **Sections in order:** Hero "PulsAnalys DISC – Ett kommunikationsverktyg som förenklar vardagen" followed by "Utbildning i DISC för framtida chefer, konsulter och rekryterare" (CTAs: Läs mer här! → `/grundutbildning-disc/`, Anmäl dig nu! → `/grundutbildning/`) · Four cards with the DISC colour circles: Vad är PulsAnalys? → `/vad-ar-pulsanalys/` · Föreläsningar → `/webbinarier/` (and a dead link to `/inspirationsforelasningar/`) · Kurser → `/kurser/` · Bli distributör → `/distributor/` · "Några av våra kunder" logo carousel (AstraZeneca, Jönköping Energi, Finansförbundet, ICA Maxi, Barilla, OX2) · "Kommande Grundutbildningar DISC" (2 dates from the events system) · "Kommande Föreläsningar" (hidden on all breakpoints, shows "No data was found") · "Våra produkter" (Personprofil, Teamprofil, Rekryteringsprofil, 360-profil – same text as `/produkter/`) · "Omdömen" slider (7 quotes: Mikael Hansen/AstraZeneca, Pia Antill/Birka Cruises, Inger Eriksson/Eckerö Rederi, Linnéa Persson/Faiveley Transport Nordic, Robert Hallgren/The Generation, Jessica Hill Holm/Hill Holm Coaching & Consulting, Linda Hanserius/Järfälla kommun, Tommy Smedberg/Wästbygg).
- **Note:** Linda Hanserius (Järfälla kommun) appears only here, not on `/omdomen/`.
- **Images:** 4 DISC colour circles (150 px, originals 1159 px), 6 client logos, course card photo `2021/06/pulsanalys-1.jpg`, hero/background photos `pulsanalys-1-6-min-1.jpg`, `pulsanalys-30-min.jpg`, `pulsanalys-1-5-min.jpg`, `pulsanalys-55-min.jpg`, `group_picture_januari_2021.png`.

### `/produkter/` Produkter
- **Purpose:** overview of the four profiles plus consulting.
- **Description:** "Vi erbjuder flera olika kommunikationsverktyg och profiler. Läs mer om Personprofil, Teamprofil, Rekryteringsprofil, 360-profil och konsulttjänster."
- **Content:** H "Läs mer här om alla våra produkter"; five blocks (Personprofil, Teamprofil, Rekryteringsprofil, 360-profil, Konsulttjänster), each a short paragraph + "Läs mer". One photo per block.

### `/personprofil/` Personprofil
- **Purpose:** explain the Personprofil.
- **H:** "En DISC-analys som synliggör dina personliga egenskaper och drivkrafter". Sub-sections: Vad är en Personprofil? · Användningsområden (8 bullets: Personlig utveckling, Utvecklingssamtal, Ökad kundservice, Förbättrad kommunikation, Coaching och karriärutveckling, Chefsutveckling, Personligt brev till CV, Stresshantering) · Hur går en Personprofil till? (25 påståenden, 15 språk, ca 10–12 minuter, spontanmetoden, tvingande svar, neutralt språk, graf).
- **Key facts stated:** measures three things – "vårt sociala jag", adaptation at work, adaptation under pressure.
- **Images:** 3 photos (one without alt).

### `/teamprofil/` Teamprofil
- **H:** "Skapa högpresterande team med rätt kravprofil". Sections: Vad är en Teamprofil? · Användningsområden (4 bullets) · Hur går en Teamprofil till? (5 steps).
- **Images:** 4 photos.

### `/rekryteringsprofil/` Rekryteringsprofil
- **H:** "Ett rekryteringsverktyg som verkligen hjälper". Sections: Vad är en Rekryteringsprofil? · Användningsområden (6 bullets) · Hur går en Rekryteringsprofil till? (5 steps).
- **Images:** 3 photos + a sample graph `JPI-graf.jpg` (500×540, no alt).

### `/360-profil/` 360-profil
- **H:** "Skapa insikt genom att ge varandra feedback". Sections: Vad är en 360-profil? · Användningsområden (6 bullets) · Hur går en 360-profil till? (5 steps; names the rater form "360PI").
- **Images:** 2 photos + sample graph `360pi.jpg` (500×540, no alt).

### `/konsulttjanster/` Konsulttjänster
- **Description:** mentions "human resource".
- **H:** "Konsulttjänster vi gärna hjälper dig med"; six H3 services: Företagsanpassade föreläsningar · Person- och personalutveckling · Chefs- och ledarutveckling · Rekrytering · Team- och grupputveckling · Konflikthantering. One paragraph each.
- **Links:** dead link `/inspirationsforelasningar` in the first service.

### `/kurser/` Kurser
- **H:** "NU ÄVEN ONLINE"; two blocks: Grundutbildning DISC → `/grundutbildning-disc/`, Fördjupning DISC → `/fordjupning-disc/`.

### `/grundutbildning-disc/` Grundutbildning DISC
- **Purpose:** course page for the foundation course with certification.
- **Content:** intro (two days + certification day c:a 3–4 weeks later; 10 training profiles included; feedback scheme and ethical rules) · "Våra funktioner" · Utbildningsprogram dag 1, dag 2, dag 3 (09:00–16:00, bullet lists) · **Pris: 19 900 SEK (exkl. moms)** · links: Anmäl dig → `/grundutbildning/`, produkter, Vad är DISC.
- **Images:** 5 photos incl. "Diplom DISC".

### `/fordjupning-disc/` Fördjupning DISC
- **H:** "Utveckla dina kunskaper". Intro (one full day; target group) · three parts: Teamprofiler, Rekryteringsprofiler, 360-profiler (each with bullets) · Utbildningsprogram 09:00–16:00 (6 bullets) · links.
- **No price on page** (the event page for 25 Nov 2026 says "Kostnadsfritt").

### `/ledarskapsutbildning/` Ledarskapsutbildning
- **No meta description.**
- **Content:** intro (8 sessions of about 60 minutes, mainly online, recordings available, ends with diploma) · Innehåll vecka 1–4 (4 bullets) · Innehåll vecka 5–8 (4 bullets, incl. Susan Wheelan) · "Utbildningsprogram – Onsdagar kl. 15:00–16:00" (6 bullets) · links: Anmäl dig → `/webbinarier/`.
- **No price, no dates.**

### `/utbildningar-och-forelasningar/` Utbildningar och föreläsningar ("Anmäl dig här")
- **Purpose:** calendar hub. Lists upcoming Grundutbildningar (26–27 Nov 2026, 8–9 Dec 2026, online, 09:00–16:00), Föreläsningar ("No data was found"), Fördjupningskurser (25 Nov 2026, online). Links to each `/anmalan/?eventid=…`.

### `/grundutbildning/` Grundutbildningar DISC (date list)
- Same intro paragraph printed twice ("I dagens moderna samhälle …"). Two dates with "Anmäl dig".

### `/fordjupningskurser/` Fördjupningskurser DISC (date list)
- One date: 25 Nov 2026, online.

### `/webbinarier/` Webbinarier
- Text names the lecturer **Mia Wernersson**. List empty: "No data was found".

### `/event/` Events
- Intro paragraph about mingel, kundträffar, föreläsningar; the course intro paragraph misplaced underneath; one event: **Kundträff 19 Nov 2026, Stockholm, 12:00–15:00** (`/anmalan/?eventid=536`, interest registration, not binding).

### `/anmalan/?eventid=N` Event detail (4 current: 531, 532, 534, 536)
- Title, date, time, place, long description, course leader (Mia Wernersson, 070-676 23 75), price (19 900 SEK exkl. moms for Grundutbildning; "Kostnadsfritt" for Fördjupningskurs 25 Nov), "OBS! Anmälan är bindande. Fakturering sker i förskott." Button "Anmäl dig" → `/bokning/?eventid=N`.

### `/bokning/?eventid=N` Booking form (custom system)
- Fields: Förnamn*, Efternamn*, E-postadress*, Bekräfta e-postadress*, Telefonnummer*, Företagsnamn, Organisationsnummer, Referens* (Mia Wernersson, Kim Adeholm, Per Kristensen, Dan Morast, LinkedIn, Facebook, Annat), Faktureringsadress*, Postnummer*, Postort*, Rabattkod. Posts by AJAX to `https://pulsanalys.se/events/ajax/ajax.php`.

### `/vad-ar-pulsanalys/` Vad är PulsAnalys?
- **Purpose:** the "three steps" explainer.
- **Content:** intro · Steg 1 – Grundutbildning DISC · Steg 2 – Certifiering · Steg 3 – Abonnemang. Includes "Med PulsAnalys…" (3 benefits) and "PulsAnalys mäter…" (3 measures).
- **Claims to check:** "Validiteten är mycket hög". Refers to "telefonen i skärmens nederkant", which no longer exists.

### `/vad-ar-disc/` Vad är DISC?
- **H:** "En teori föds och ett HR-system tar form". Sections: DISC – Bakgrund · four factor names (DOMINANCE, INFLUENCE, STEADINESS, CONSCIENTIOUSNESS) · DISC-teorin (Marston, 1928, *The Emotions of Normal People*).
- **Claims to check:** "ett av världens mest använda redskap för att skapa personprofiler".
- **Image:** portrait of William Moulton Marston (213×300, public domain; provenance to confirm).

### `/om-oss/` Om oss
- **Content:** company text (founded mid-1990s by Robert Mellin; owned and run by Mia Wernersson; represented in several places in Sweden; seeking partners in the Nordics, Italy, Spain) · Vår vision · Vår affärsidé · "Träffa vårt team": Mia Wernersson (VD), Kim Adeholm (Affärsutveckling & Kommunikationsansvarig), Paul Wilson (Systemutvecklare) with email, phone, LinkedIn.
- **Conflict:** the meta description says "finns idag på flera platser i Sverige samt på Åland och i Kina"; the page body does not.

### `/kontakta-oss/` Kontakta oss
- **Content:** two address blocks for different screen sizes that disagree (see DEFECTS.md) · org.nr 556600-3868 · info@ and support@ · phone 070-676 23 75 · team: Mia Wernersson, Kim Adeholm, Paul Wilson, Nathalie Bagger (Ekonomiansvarig, external e-mail @eliteredovisning.se), Ewa Gadomska (Regionansvarig Polen/UAE – hidden on every screen size) · Google Maps iframe (Wollmar Yxkullsgatan 7).

### `/omdomen/` Omdömen
- 10 testimonials: Mikael Hansen (AstraZeneca), Pia Antill (Birka Cruises AB), Anders Wiklund (Optinova), Inger Eriksson (Eckerö Rederi AB), Jessica Hill Holm (Hill Holm Coaching & Consulting), Linnéa Persson (Faiveley Transport Nordic AB), Robert Hallgren (The Generation AB), Margareta Malmberg Norring (Medskap), Anders Wiklund (Åda AB – a quote from a recruitment announcement, not a review of PulsAnalys), Tommy Smedberg (company not named here; "Wästbygg" on the home page).

### `/distributor/` Bli distributör
- **Content:** intro · "Som distributör förväntar vi oss" (6 bullets) · list of 10 named distributors with phone and city (Jessica Hill Holm, Carina Grönholm, Christoffer Pettersson, Marita Larenhjelm, Ronnie Carlsson, Catharina Byberg, Marie Bubach, Yvonne Achrelius, Camilla Carlsson, Carina Sörlander Jäder) · "Vad vi erbjuder dig" (4 bullets) · contact VD Mia Wernersson 070-676 23 75.
- **Images:** photo, map of Sweden (PNG), photo.
- **Link:** dead `/pulsanalys2019/pulscertifiering-disc/`.

### `/skaffa-abonnemang/` Skaffa abonnemang (footer)
- Intro text, then a questionnaire shortcode that no longer renders: `[modalsurvey id="1994235982" …]` is printed as text. The questionnaire's result pages are `/6-anvandare/`, `/1000-anstallda/`, `/abonnemangsresultat/` (orphans, see §3).

### `/blogg/` Blogg
- Lists 5 posts from January–April 2021.

### Blog posts (5)
| URL | Title | Content notes |
|---|---|---|
| `/2021/01/15/nyhetsbrev-januari-2021/` | Nyhetsbrev Januari 2021 | Christmas draw, kick-offs, newly certified users (3 named, LinkedIn links), courses, lectures, podcast tip (Spotify). Contains a placeholder "vår hemsida XX". 7 images |
| `/2021/02/15/nyhetsbrev-februari-2021/` | Nyhetsbrev Februari 2021 | "Den röda personlighetens månad", LinkedIn poll results, Valentine's wheel. 5 images |
| `/2021/03/15/nyhetsbrev-mars-2021/` | Nyhetsbrev Mars 2021 | Easter greeting, thanks to Peter Lövgren. 2 images |
| `/2021/04/15/nyhetsbrev-april-2021/` | Nyhetsbrev April 2021 | Polish market partnership, 8 newly certified users (LinkedIn links), thanks to Daniel Lundell. 3 images |
| `/2021/04/29/pulsanalys-ab-och-business-match-scandinavia-poland-ingar-ett-internationellt-samarbete/` | Partnership press release | Swedish and English text on one page. The shortcode `[wof_wheel id="6328"]` is printed as text at the bottom |

### `/integritetspolicy/` Integritetspolicy
- Sections: Personuppgiftsansvarig · Personuppgifter och cookies · Varför lagrar … · Hur länge lagrar vi cookies? · För dig som gör profiler · För dig som har företagskonto · Att ge/dra tillbaka medgivande · Att uppdatera sina uppgifter · Att bli glömd · Att få dina uppgifter utlämnade · Kontakta oss (support@pulsanalys.se).

### `/faq/` FAQ (not linked anywhere)
- One question, printed three times: "Hur återställer jag mitt lösenord i systemet?"

---

## 3. Swedish pages – orphan or broken

| URL | What it is | Status |
|---|---|---|
| `/foretag/` "Arbetsgivare" | 8× Lorem ipsum, 8× the old logo, "Intresserad? Anmäl dig nu!" → clientarea | Placeholder |
| `/konsulter/` | 5 regional consultants with photo, e-mail, phone, region (Jessica Hillholm, Marie Bubach, Marita Larenhjelm, Catarina Byberg, Katarina Nilsson) | Orphan, real content |
| `/studenter/` | "För dig som studerar … samhällsbyggnadsprogrammen", counter "0+ Studenter", photo "byggcheferna" | Orphan, unfinished |
| `/6-anvandare/`, `/1000-anstallda/` | Questionnaire result: "Detta är det abonnemang som vi rekommenderar…", "Offert – Detta ingår:" (11 items), "Skaffa abonnemanget" | Orphan |
| `/abonnemangsresultat/` | Questionnaire result | 500 error |
| `/cvgeneratorn/` | Only the raw `[modalsurvey]` shortcode | Broken |
| `/bokning/` (no eventid) | Booking page | 500 error |
| `/anmalan/` (no eventid) | Event page | 500 error |
| `/events/` | Custom events system | 500 error |
| `/events/aw-mingel/` | Title "Mingel", no content | Empty |
| `/privacy-policy/` | English privacy policy on a Swedish URL | Duplicate |
| `/author/paul070707/`, `/category/uncategorized-sv/`, `/tag/svenska/` | WordPress archives | Theme leftovers |
| About 200 event posts | `/grundutbildningar/…`, `/grundutbildning-slid/…`, `/fordjupnings-kurs/…`, `/fordjupningskurs-sli/…`, `/forelasningar/…`, `/inspirations-homepag/…`, `/inspirations-slide/…`, and Polish 2022 courses `/grund-polish-slide/…`, `/grundutbildningar-po/…` – dated 2021–2026, almost all in the past | Indexed old events |

---

## 4. English pages (`/en/`)

Every live Swedish page has an English twin, machine-translated. Slugs and status:

| Swedish | English | Note |
|---|---|---|
| `/` | `/en/` | |
| `/produkter/` | `/en/products-and-services/` | |
| `/personprofil/` | `/en/personal-profile/` | |
| `/teamprofil/` | `/en/team-profile/` | |
| `/rekryteringsprofil/` | `/en/recruitment-profile/` | |
| `/360-profil/` | `/en/360-profile/` | |
| `/konsulttjanster/` | `/en/consulting-services/` | |
| `/kurser/` | `/en/courses/` | |
| `/grundutbildning-disc/` | `/en/basic-disc-training/` | |
| `/fordjupning-disc/` | `/en/immersion-disc/` | Mistranslated slug and title |
| `/ledarskapsutbildning/` | `/en/leadership-training/` | |
| `/utbildningar-och-forelasningar/` | `/en/training-courses-and-lectures/` | Event titles stay Swedish |
| `/grundutbildning/` | `/en/basic-education/` | Event titles and "Anmäl dig" stay Swedish |
| `/fordjupningskurser/` | `/en/advanced-courses/` | Same |
| `/webbinarier/` | `/en/lectures/` | |
| `/event/` | – | No English version |
| `/vad-ar-pulsanalys/` | `/en/what-is-pulseanalysis/` | Brand misspelled in slug |
| `/vad-ar-disc/` | `/en/what-is-disc/` | |
| `/om-oss/` | `/en/about-us/` | |
| `/kontakta-oss/` | `/en/contact-us-for-more-information/` and `/en/contact-us/` | Two versions |
| `/omdomen/` | `/en/reviews/` | Testimonials machine-translated |
| `/distributor/` | `/en/become-a-distributor/` | |
| `/skaffa-abonnemang/` | `/en/get-a-subscription/` | |
| `/blogg/` | `/en/blog/` | Lists the Swedish posts |
| `/integritetspolicy/` | `/en/privacy-policy-2/` and `/en/privacy-policy/` | Two versions |
| `/faq/` | `/en/faq/` | |
| orphans | `/en/companies/`, `/en/consultants/`, `/en/students/`, `/en/6-users/`, `/en/1000-employees/`, `/en/subscription-results/` (500), `/en/cv-generators/`, `/en/booking/` (500) | As Swedish |

The English menu still contains the Swedish label "Anmäl dig här".

---

## 5. Content types the brief mentions

| Content type | Found? |
|---|---|
| Pages, course pages, upcoming course dates | Yes |
| Consulting services | Yes (`/konsulttjanster/`) |
| Product descriptions | Yes (4 profiles) |
| Testimonials | Yes (10 on `/omdomen/`, 8 on home, 1 unique to home) |
| FAQs | One question only (`/faq/`, unlinked) |
| Contact details | Yes |
| Legal pages | Privacy policy only. No cookie policy, no terms, no course booking terms beyond "Anmälan är bindande. Fakturering sker i förskott." |
| Logos | Own logo + 6 client logos |
| **Shop or catalogue** | **No shop.** The closest is the broken subscription questionnaire (`/skaffa-abonnemang/` and its result pages). No prices for subscriptions are published |
| Blog / news | Yes – 5 posts from 2021 (the brief lists blog as out of scope for *new* work; the existing posts are content and are carried over) |
