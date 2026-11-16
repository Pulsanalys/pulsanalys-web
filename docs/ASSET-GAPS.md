# Asset gaps

Every image in use on the Swedish pages was listed with its displayed size and,
where WordPress had cropped it, the size of the original upload. Sizes below are
pixels (width × height).

Rule of thumb for the new design: a full-width image needs at least **2560 px** on its
long edge to stay sharp on a large retina screen; a half-width image needs **1600 px**;
a portrait in a team grid needs **1200 px** on its long edge.

## 1. Logo and brand

| Asset | What we have | Gap |
|---|---|---|
| Logo, stacked | SVG (black and white text) in Hussein's folder – vector, 16 colours | None |
| Logo, horizontal | PNG only (dark and white text) in Hussein's folder; PNG 653×183 on the site | **No vector.** Either supply the SVG or approve that the horizontal version is rebuilt as SVG from the stacked SVG (same artwork, re-arranged) |
| Favicon | PNG 300×300 | Rebuilt from the SVG mark (SVG, 32 px ICO, 180 px Apple touch icon) |
| DISC colour circles | PNG, originals 1159×1158 | Fine. Can be redrawn as SVG for sharpness (same colours, no change in look) |
| Brand colours | Not documented. Site uses navy `#2E3E60` and grey `#8F8685`; the logo SVG uses red/pink `#A1255C` `#B62C64` `#AC3F3C` `#BC524B`, yellows `#DEBB4F` `#E6CC69` `#E7CF58` `#EEE158`, greens `#5F8A4C` `#78974A` `#85B074` `#A5BE75`, teal/blues `#49736A` `#60949E` `#679F96` `#79B4C7`, text `#222221` | Palette will be derived from the logo in DESIGN.md (stage 2) |
| Fonts | Avenir Book/Medium/Black self-hosted from 2019 | **Licence unknown.** Avenir is a commercial typeface (Linotype/Monotype) and needs a web licence to self-host. Confirm the licence, or the new site uses a licensed or open-licence alternative |

## 2. Photography

Most photos come from one photo session (file names `pulsanalys-*-min.jpg`, uploaded
February–March 2020). The `-min` suffix means they were compressed before upload.
**The original camera files from that session would remove almost every gap below.**

| Image | Used on | Size | Gap |
|---|---|---|---|
| `pulsanalys-1-6-min-1.jpg` | Home hero background, `/kurser/` | 1980×971 | Too small for a full-width hero |
| `pulsanalys-1-5-min.jpg` | Home background, `/produkter/` | 1980×1320 | Too small for full width; fine half-width |
| `pulsanalys-30-min.jpg` | Home background, `/produkter/` | 1080×684 | Too small for anything larger than a card |
| `pulsanalys-55-min.jpg` | Home background | 1080×711 | Same |
| `group_picture_januari_2021.png` | Home background | 800×600 | Too small; PNG |
| `pulsanalys_forelasning.jpg` | `/produkter/`, `/konsulttjanster/` | 1960×1011 | Too small for full width |
| `pulsanalys-1-11-min.jpg`, `-1-17-min-1.jpg`, `-1-2-min`, `-1-3-min`, `-1-min`, `-1-9-min`, `-1-10-min`, `-1-15-min`, `-1-16-min` | Product and course pages | 1320–1980 long edge | Fine for half-width; small for full width |
| `pulsanalys-6309/6335/6453/6484-min*.jpg` | Course and product pages | 1320×1980 / 1980×1600 | Fine half-width |
| `pulsanalys-2/3/7/16/19/26/27/29/35/44/51-min*.jpg` | Various | 648–1080 long edge | Small – card size only |
| `2021/06/pulsanalys-1.jpg`, `pulsanalys-13-min.jpg` | Event cards | 1080×720 / 1080×749 | Card size only |
| `pulsanalys-15-min-1.jpg` | `/distributor/` | 655×1080 | Card size only |

## 3. People

| Image | Size | Gap |
|---|---|---|
| Mia Wernersson `pulsanalys-50.jpg` | 533×800 | **Too small** for the new team section. Need ≥1200 px |
| Kim Adeholm `…kim-adeholm-profilbild.jpg` | original 641×1024 | Too small |
| Paul Wilson `pulsanalys-22.jpg` | 533×800 | Too small |
| Nathalie Bagger `nathalie_johansdotter_profilbild-1.jpg` | original 724×1024 | Small; file name uses another surname (check the name) |
| Ewa Gadomska `PHOTO-2022-02-10…jpg` | original 682×1024 | Small (and currently hidden) |
| Consultants (`/konsulter/`) | 912–6720 px originals | Fine |
| William Moulton Marston | 213×300 | Too small. Public-domain portrait; a larger public-domain scan can be sourced if Hussein approves |

The team photos do not match each other in light, crop or background. A short
portrait session for Mia, Kim and Paul would lift the site more than any design detail.
This is a recommendation, not a requirement; the site will be built with what exists.

## 4. Client logos

| Logo | Size | Gap |
|---|---|---|
| Jönköping Energi | 375×135 JPEG | **Low quality**, white box background. Need SVG/PNG |
| AstraZeneca | 720×195 PNG | OK; SVG preferred |
| Finansförbundet | 1667×1042 PNG | OK (lots of white space) |
| ICA Maxi | 473×189 PNG | Small; SVG preferred |
| Barilla | 1200×480 PNG | OK |
| OX2 | 700×366 PNG | OK |

For a calm logo row the logos must be shown in one colour; that needs SVG or
transparent PNG versions. If not available they will be shown as supplied.

## 5. Graphics

| Image | Size | Gap |
|---|---|---|
| Sample graph `JPI-graf.jpg` (Rekryteringsprofil) | 500×540 JPEG | Too small and blurry. Need a fresh export from the profile system |
| Sample graph `360pi.jpg` (360-profil) | 500×540 JPEG | Same |
| Map of Sweden `Sverigekarta-Landskap.png` (distributors) | 450×1024 PNG | Fine; can be redrawn as SVG |
| Newsletter images 2021 | 300–2560 px, several PNG photos up to 2.7 MB | Usable after conversion to WebP/AVIF; the 300×203 `rosa_gubbar` is small |

## 6. Downloading the originals

The brief asks for every image and document to be downloaded with originals untouched.
The build workspace cannot reach pulsanalys.se directly, so the download runs as a
GitHub Action inside the repository (`.github/workflows/archive-current-site.yml`).
It was tested against a local mock server; it has not yet run against the live
site. It fetches every URL in the sitemaps, saves the raw HTML to `archive/html/`, and
saves every `/wp-content/uploads/` file at its original resolution to
`archive/uploads/`, with a manifest of sizes and checksums. It runs once the
repository exists and is not run again after cutover.

No documents (PDF, Word) are linked from the public site.
