# Domain dependencies – pulsanalys.se

Everything on or behind pulsanalys.se besides the marketing pages. Checked
16 November 2026 with public DNS lookups (Cloudflare DNS-over-HTTPS) and by
reading the live pages. Nothing was changed.

**Summary:** the DNS for pulsanalys.se is at One.com, the website runs on One.com
hosting, e-mail runs on Microsoft 365, and the customer profile system is on a
separate domain and server. The one thing that will break at cutover unless it is
planned for is **course booking**, which runs inside the WordPress site.

## 1. DNS (public records found)

| Name | Type | Value | Used for |
|---|---|---|---|
| pulsanalys.se | NS | ns01.one.com, ns02.one.com | DNS hosted at One.com |
| pulsanalys.se | A | 46.30.213.22 | Website (One.com) |
| pulsanalys.se | AAAA | 2a02:2350:5:10a:b1:890:fbca:ac71 | Website (One.com) |
| www.pulsanalys.se | A | 46.30.213.22 | Website (One.com) |
| pulsanalys.se | MX | 0 pulsanalys-se.mail.protection.outlook.com | **E-mail (Microsoft 365)** |
| pulsanalys.se | TXT | `v=spf1 include:spf.protection.outlook.com -all` | **SPF** – only Microsoft may send |
| pulsanalys.se | TXT | `MS=ms14999083` | Microsoft 365 domain verification |
| autodiscover.pulsanalys.se | CNAME | autodiscover.outlook.com | Outlook set-up |
| ftp.pulsanalys.se | CNAME/A | ftp.cohcslez0.service.one → 46.30.211.118 | One.com FTP |
| _dmarc.pulsanalys.se | TXT | **none** | No DMARC policy |
| selector1/2._domainkey.pulsanalys.se | CNAME | **none** | **DKIM not set up** for Microsoft 365 |

Lookups only see names that are asked for. Before any DNS change, Hussein must export
the **full zone** from One.com's control panel and keep the copy (cutover step 1).

### What this means
- **Moving the website does not require moving the DNS.** At cutover only the `A`,
  `AAAA` and `www` records need to point at Cloudflare – or the whole zone can move
  to Cloudflare. Both work; moving the zone is cleaner but carries the e-mail risk.
  Decision belongs to the cutover plan.
- If the zone moves to Cloudflare, every record above must be recreated **before**
  the name servers change, MX and SPF first.
- **SPF ends in `-all`.** If the new contact forms send e-mail *from* an
  `@pulsanalys.se` address through any service other than Microsoft 365, those mails
  will be rejected. The form design must either send through Microsoft 365, send from
  another domain, or add the sending service to SPF (a DNS change – Hussein's call).
- **No DKIM and no DMARC.** Not caused by this project, but mail from pulsanalys.se is
  more likely to land in spam. Recommended as a separate task for Hussein.

## 2. Customer profile system (clientarea)

| Item | Value |
|---|---|
| Login URL | `https://clientarea.pulsanalys.com/` |
| Domain | pulsanalys**.com** (DNS on Cloudflare: nola/ray.ns.cloudflare.com) |
| Server | 95.111.243.248 (not One.com) |
| Linked from | Header "Logga in" (every page), `/foretag/`, `/konsulter/`, `/studenter/` |

The profile system is on another domain and server, so the website move **does not
affect it**. The new site keeps "Logga in" in the header, pointing to the same URL.
Respondent links sent by e-mail go to clientarea, not to pulsanalys.se (to confirm
with Paul: are any respondent or report links built on `pulsanalys.se`?).

## 3. Course and event booking – **must be decided before cutover**

The booking system is custom PHP running inside the WordPress hosting:

| Part | URL | Notes |
|---|---|---|
| Event list widgets | on `/`, `/grundutbildning/`, `/fordjupningskurser/`, `/webbinarier/`, `/event/`, `/utbildningar-och-forelasningar/` | Reads events from the system |
| Event page | `/anmalan/?eventid=N` | Title, date, place, description, price, leader |
| Booking form | `/bokning/?eventid=N` | 12 fields (see CONTENT-INVENTORY) |
| Form handler | `POST /events/ajax/ajax.php` | Stores the booking; where it sends notifications is not visible from outside |
| Admin | `/events/` | Returns 500 to the public; probably the admin area |

Current upcoming events: 531 (Grundutbildning 26–27 Nov), 532 (Grundutbildning 8–9 Dec),
534 (Fördjupningskurs 25 Nov), 536 (Kundträff 19 Nov).

**If pulsanalys.se moves to the new site, `/events/` and `/bokning/` stop working.**
Options for Hussein (decision at the gate):
- **A. Keep the old system on a sub-domain**, e.g. `boka.pulsanalys.se` → the One.com
  hosting. The new site's "Anmäl dig" buttons link there. Needs Paul to confirm the PHP
  system works under another host name, and the WordPress install must then stay
  running and patched.
- **B. Replace it with a booking form on the new site.** A Cloudflare Worker validates
  the same 12 fields, checks Turnstile and e-mails the booking to the inbox Hussein
  names. Dates live in the site's content files. No booking data is stored on the
  website. This removes the dependency on WordPress entirely.
- Either way: export all bookings from the old system on cutover day so nothing is lost.

Questions for Paul: where does `ajax.php` store bookings and who receives the
notification e-mail? Is there a confirmation e-mail to the participant?

## 4. Forms on the current site

| Form | Where | Fields | Handler |
|---|---|---|---|
| "Vill ni veta mer?" | Footer, every page | Namn*, Telefonnummer, E-postadress* | WPForms Lite #9502 (WordPress mail) |
| "Bli uppringd av oss!" | Popup #5824 (seen inline on blog posts) | Namn*, Företag, Mejladress*, Mobilnummer*, Ärende* | WPForms |
| Booking | `/bokning/?eventid=N` | 12 fields | custom `events/ajax/ajax.php` |
| Subscription questionnaire | `/skaffa-abonnemang/` | – | Plugin removed; broken |

Recipient inboxes are configured inside WordPress and are not visible from outside.
**Needed from Hussein: which inbox receives each form.**

## 5. Third-party services loaded by the site

| Service | How | Keep? |
|---|---|---|
| Google Fonts (Roboto, Roboto Slab) | `fonts.googleapis.com` stylesheet | No – unused, privacy issue |
| Google Maps | iframe on `/kontakta-oss/` | Replace with a static map image or a plain "Visa på karta" link (no data to Google until clicked) |
| Facebook, LinkedIn, Instagram | Plain links in footer | Keep (links only) |
| Spotify | Link in Jan 2021 newsletter | Keep (link only) |
| Analytics / ads | **None found** (no Google Analytics, Tag Manager, Meta Pixel, LinkedIn Insight or Hotjar) | Cloudflare Web Analytics proposed (cookieless) |

## 6. Other

- `pulsanalys.co` (staging domain in the brief) **is not registered**. Staging uses the free Cloudflare address instead, as agreed.
- `pulsanalys.com` is on Cloudflare (it hosts clientarea). Hussein's connected Cloudflare account has no Workers yet; whether pulsanalys.com is in the same account was not checked.
- Social profiles: facebook.com/PulsAnalysAb, linkedin.com/company/pulsanalys-ab, instagram.com/pulsanalysab.
