# Design direction – pulsanalys.se

Status: proposal for Hussein's approval with the homepage prototype (stage 2 gate).

## 0. Positioning (Hussein, 17 November 2026)

The site must read as a **serious, high-end consulting firm** selling B2B services to
mature, senior buyers – C-level executives, HR directors, management teams – while
being visibly modern in its build and behaviour. In practice:

- **Restraint over expression.** One typographic scale, one image system, one grid. Nothing is larger than the H1; contact details are body text, not display type.
- **Editorial serif for headings** (Source Serif 4) over a quiet grotesk for text (Schibsted Grotesk). Classic advisory tone, current typefaces.
- **Square corners** (2 px) on buttons and photos; navy rules mark the start of each section.
- **Every photo is 3:2** (the hero is 2:1 on screens from 768 px). In split sections the photo spans 5 of 12 columns and the text starts at column 7; products sit in an even 2 × 2 grid.
- **Modern underneath:** scroll-driven CSS animation, AVIF/WebP, zero JavaScript on content pages, Lighthouse 100, WCAG 2.2 AA.

## 1. The idea

PulsAnalys sells understanding between people, and its product is a graph: four factor
bars – **Pådrivande, Utåtriktad, Lyhörd, Systematisk** – measured three ways (as you are,
at work, under pressure). The site borrows that graph as its one visual signature.
Everything else stays quiet: white paper, navy ink, real photographs of real people,
large calm type. The four DISC colours appear only where they mean something – in the
logo and in profile graphics – never as decoration.

The site should feel like a confident consultancy that has done this for 30 years, not a
software start-up and not a self-help brand.

## 2. What we studied, and what we take

Looked at live on 16 November 2026: apple.com (AirPods Pro product page) and aesop.com.
Stripe and Kinfolk were used from earlier familiarity, not re-checked today.
Techniques only – no assets, layouts or copy are borrowed.

| Source | Technique | Why it fits PulsAnalys |
|---|---|---|
| Apple product pages | Sections pinned with `position: sticky` while the content inside changes (12 sticky elements on the page); native scrolling, never hijacked | One pinned section lets the profile graph change from "as you are" to "at work" to "under pressure" while the reader scrolls – the product explains itself |
| Apple | Very large headlines with tight line height (56/60 px) and slightly negative tracking; body at 17 px; content held to ~980–1024 px | Large, calm type is the main premium signal and costs nothing in speed |
| Aesop | One sans-serif family throughout, warm photography with lots of air, few colours, nothing animated for its own sake | Restraint reads as confidence for a B2B advisory brand |
| Stripe | Precise easing and short durations on interactive elements | Small interactions feel finished without drawing attention |
| Kinfolk | Editorial rhythm: generous white space, photographs given room, text in narrow columns | The current site's photos are good; they need space, not effects |

## 3. Colour

Derived from the logo (the four quartered circles) and the current site's navy.

| Token | Hex | Use | Contrast on white |
|---|---|---|---|
| `--ink` | `#1F2A44` | Body text | 14.3:1 |
| `--navy` | `#2E3E60` | Headings, links, buttons, logo text | 10.6:1 |
| `--muted` | `#5A6274` | Secondary text | 6.1:1 |
| `--paper` | `#FFFFFF` | Page | – |
| `--mist` | `#F1F3F2` | Alternate sections | – |
| `--line` | `#D8DDDB` | Rules, input borders (inputs use `#8A92A0`, 3.3:1) | – |
| `--d` Pådrivande | `#AC3F3C` | Graph bar D (logo red) | 6.0:1 |
| `--i` Utåtriktad | `#B8891F` | Graph bar I – logo yellow `#DEBB4F` deepened to reach 3:1 for graphics | 3.2:1 |
| `--s` Lyhörd | `#5F8A4C` | Graph bar S (logo green) | 4.0:1 |
| `--c` Systematisk | `#60949E` | Graph bar C (logo blue) | 3.4:1 |

Rules: no gradients, no tinted shadows, no colour washes. The factor colours never carry
meaning alone – every bar has a text label.

## 4. Typography

**Source Serif 4** (variable weight, SIL Open Font License) for H1 and H2, weight 500.
**Schibsted Grotesk** (variable, SIL Open Font License) for everything else – a sober
Scandinavian newspaper grotesk. Both self-hosted as woff2 with Latin and Latin Extended
subsets (å, ä, ö included).

Avenir, used on today's site, is a commercial font; its web licence is unknown (see
ASSET-GAPS.md), so it is not used.

| Role | Size (mobile → desktop) | Line height | Weight | Tracking |
|---|---|---|---|---|
| Display (H1, serif) | 2.25 → 3.75 rem | 1.08 | 500 | −0.015 em |
| H2 (serif) | 1.75 → 2.625 rem | 1.15 | 500 | −0.01 em |
| H3 (sans) | 1.125 → 1.25 rem | 1.3 | 600 | 0 |
| Lead | 1.125 → 1.3125 rem | 1.55 | 400 | 0 |
| Body | 1.0625 rem | 1.6 | 400 | 0 |
| Small | 0.875 rem | 1.5 | 500 | 0 |

Sentence case everywhere. No all-caps labels. Measure: body text at most 68 characters,
leads at most 52. Long Swedish compounds wrap with `hyphens: auto` and
`overflow-wrap: break-word`.

## 5. Grid and spacing

- 12-column grid, max width 1320 px, side margin `clamp(1.25rem, 5vw, 4rem)`, gutter `clamp(1rem, 2vw, 2rem)`.
- Spacing scale (rem): 0.25 · 0.5 · 0.75 · 1 · 1.5 · 2 · 3 · 4 · 6 · 8 · 12. Section padding `clamp(4rem, 10vw, 9rem)`.
- Text left-aligned. Nothing centred except the one-line section that closes the page.

## 6. Photography

- Only the company's own photos (the 2020 session). No stock, no AI images.
- Images are shown large or not at all. One photo per section at most.
- One format: 3:2 everywhere (hero 2:1 from 768 px). No portrait crops, no mixed sizes in a row.
- 2 px radius on photos and buttons.
- Delivered as AVIF/WebP with responsive sizes, width and height set, lazy-loaded below the fold.
- Alt text describes what is in the picture, in both languages.

## 7. Motion

One strong moment per page. On the homepage it is the pinned profile graph.

| Where | What | How |
|---|---|---|
| Profile graph (home) | Section stays in place for three screen heights; the four bars change height as the reader moves through "Grundbeteende", "I arbetsmiljön", "Under press" | CSS `view-timeline` on the section, `animation-timeline` on the bars (`transform: scaleY`) |
| Large photos | Settle from 1.06× to 1× as they enter (1.03× on small screens) | `animation-timeline: view()`, transform only |
| Header | Gains a white background and a hairline after the first 80 px of scroll | `animation-timeline: scroll(root)` on a pseudo-element's opacity |
| Links, buttons | Underline and background change in 160 ms | Transitions; every hover has a `:focus-visible` and `:active` equivalent |

Rules (from the brief, all met in the prototype):

- Transform and opacity only. Native scrolling, never smoothed or slowed. No `background-attachment: fixed`.
- Every scroll animation sits inside `@supports (animation-timeline: view())` **and** `@media (prefers-reduced-motion: no-preference)`. Without either, the page shows the static layout – the graph becomes three small graphs side by side.
- All content readable with JavaScript off. The homepage ships no JavaScript at all.
- Full-height sections use `svh`.
- No animation library. Size of motion code: 0 KB of JavaScript.

## 8. Components

| Component | Notes |
|---|---|
| Site header | Logo (horizontal, inline SVG), main navigation, "Logga in" to clientarea, language link. Mobile menu is a `<details>` disclosure – works without JavaScript |
| Button | Navy fill, white text, square corners (2 px), 2.75 rem minimum height; secondary as text link with underline |
| Profile graph | Four labelled bars on a 0–100 baseline; static and pinned variants |
| Steps | Numbered list – used only for real sequences (training → certification → subscription) |
| Product grid | 2 × 2 grid: 3:2 photo, heading, text, link – all four items the same size |
| Date list | Course dates from the content collection, each row a link to its booking page |
| Logo row | Client logos in greyscale at equal visual weight |
| Quote rail | Testimonials on white panels in a horizontal scroll-snap row, quotes in the serif; keyboard-focusable; native touch scrolling |
| Contact band | Closing section: heading left, phone and e-mail as a small definition list right, at body size |
| Booking form | Built in stage 1 work; takes the tokens above |

Still to design in the build stage: 404 page, form error states in context, empty states for date lists, favicon set (SVG done).

## 9. What the design avoids

No purple/blue gradient hero, glowing blobs, glass cards, emoji icons, stock illustrations,
three-icon feature rows, identical rounded cards with soft shadows, eyebrow labels over
every heading, or a different colour on one word of a headline.
