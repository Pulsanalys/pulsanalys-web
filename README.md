# pulsanalys-web

The new website for PulsAnalys AB, replacing pulsanalys.se.

Stage 1 (inventory) is in `docs/`:

- `docs/CONTENT-INVENTORY.md` – every page, its purpose, structure, images, links and forms
- `docs/URL-MAP.csv` – every old URL and where it goes (the 301 table)
- `docs/DEFECTS.md` – errors, broken links, typos, mistranslations, theme leftovers
- `docs/DOMAIN-DEPENDENCIES.md` – DNS, e-mail, the profile system, booking, forms, third parties
- `docs/ASSET-GAPS.md` – images and brand assets that are too small or missing

`tools/archive/` downloads the current site's HTML and original image uploads into
`archive/`. It runs as the GitHub Action "Archive current site".

## Course dates and booking

Each course date is one Markdown file in `src/content/events/`. To add a date, copy an
existing file, rename it `<course>-<YYYY-MM-DD>.md` and change the dates in the header.
Past dates drop off the site at the next build.

Bookings are posted to `/api/bokning` (the Worker in `worker/`). The Worker checks
Cloudflare Turnstile, validates every field again on the server, and e-mails the booking
to `MAIL_TO` (info@pulsanalys.se) with the participant as reply-to address. Nothing is
stored. Old links `/anmalan/?eventid=N` and `/bokning/?eventid=N` redirect to the new
event page through the `legacyId` field.

Settings (Cloudflare → Workers → pulsanalys-web → Settings):

| Name | Kind | Value |
|---|---|---|
| `TURNSTILE_SECRET_KEY` | Secret | From the Turnstile widget |
| `PUBLIC_TURNSTILE_SITE_KEY` | Build variable | From the Turnstile widget |
| `PUBLIC_STAGING` | Build variable | Leave unset on the review address (noindex is the default). Set to `false` at launch |
| `MAIL_FROM` | Variable (`wrangler.jsonc`) | Sender on a domain onboarded to Cloudflare Email Service |

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local site with live reload (no Worker) |
| `npm run preview` | Build and run the site with the Worker locally |
| `npm test` | Unit tests for the booking Worker |
| `npm run check` | Type checks |
| `npm run deploy` | Build and deploy to Cloudflare |
