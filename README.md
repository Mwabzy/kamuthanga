# Mwabili Weekend Escapes

A premium, mobile-first hub for **Mwabili** — a curator of weekend escapes near
Nairobi, Kenya. Think "Linktree, but far richer": a branded hub that showcases
multiple properties, where each property has its own rich, independently
shareable page with photos/video, room types and prices, day-visit and event
options, and **WhatsApp as the primary enquiry CTA**.

This is **enquiry-first** (lead generation), not a transactional booking engine.
WhatsApp is the conversion. The codebase is structured so a booking/deposit
engine can be added later (see the `TODO(booking)` / `TODO(analytics)` comments),
but there are **no payments, calendars, or auth** today.

## Tech stack

- **Next.js (App Router) + TypeScript + Tailwind CSS**, deployable to Vercel as a
  static/SSG site.
- `next/image` for images, `next/font` (Fraunces + Inter) for fonts, native
  `<video>` for video.
- **No database, no CMS, no backend.** All content lives in one typed data file
  (`data/properties.ts`). Adding a property = adding an object there + dropping
  media in a folder. The hub auto-renders new properties with zero code changes.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build (what Vercel runs)
npm start            # serve the production build locally
```

## Project structure

```
app/
  layout.tsx              # fonts, global metadata / Open Graph defaults
  page.tsx                # "/" — the Mwabili hub (grid of property cards)
  opengraph-image.tsx     # hub share card (auto-generated)
  not-found.tsx           # 404
  [slug]/
    page.tsx              # "/<slug>" — property detail page + per-page metadata
    opengraph-image.tsx   # per-property share card (auto-generated)
components/                # PropertyCard, Hero, Gallery, UnitCard, VisitOptions,
                           # EventActivityCard, WhatsAppButton, StickyEnquire, ...
data/
  types.ts                # content types
  properties.ts           # SINGLE SOURCE OF TRUTH — all property content
lib/
  whatsapp.ts             # wa.me deep-link builders (the conversion mechanism)
  format.ts               # price / tag formatting
  site.ts                 # brand name, tagline, site URL
scripts/
  convert-media.ts        # iPhone HEIC/MOV -> web formats
media-src/<slug>/          # raw iPhone uploads (git-ignored)
public/properties/<slug>/  # converted, web-ready media (committed)
```

## Adding a new property (no code changes to the hub)

1. **Add the data.** Append a new object to the `properties` array in
   [`data/properties.ts`](data/properties.ts). Follow the existing Kamuthanga
   entry: `slug`, `name`, `tagline`, `location`, `status`, `hero`, `gallery`,
   `about`, `units`, `visitOptions`, `whatsapp` (E.164, no `+`), `highlights`.
   - Set `status: "coming-soon"` to show a dimmed, link-less teaser card on the
     hub (see the included `naivasha-retreat` example). Flip it to `"live"` when
     ready and the property gets its own page.
2. **Add the media.** Create `media-src/<slug>/`, drop in the raw iPhone files,
   and run the conversion (below). Reference the converted files in your data as
   `/properties/<slug>/<name>.webp` (or `.mp4` + `-poster.jpg` for video).

That's it — the hub grid, the `/<slug>` route, the OG share image, the sitemap
of static params, and all WhatsApp CTAs are generated automatically.

## Media conversion workflow

The owner uploads iPhone media — **`.heic` photos and `.mov` videos, which
browsers do NOT reliably render.** The app consumes **web formats only**:
`.webp`/`.jpg` for images and `.mp4` (H.264) + a `.jpg` poster for video.

```bash
# 1. Drop raw iPhone files in a per-property folder:
#      media-src/kamuthanga/hero.heic
#      media-src/kamuthanga/tour.mov
# 2. Convert everything (or pass a single slug):
npm run convert-media
npm run convert-media -- kamuthanga
# 3. Commit the converted output in public/properties/<slug>/.
```

What it does:

- `.heic`/`.heif` → `.webp` (via **sharp**, falling back to **heic-convert**)
- `.mov`/`.mp4` → web `.mp4` (H.264, faststart) **+** a `-poster.jpg` frame
  (via **ffmpeg** / fluent-ffmpeg)
- `.jpg`/`.png` → `.webp`

The original filename is preserved (`cabin-1.heic` → `cabin-1.webp`).

> **ffmpeg must be installed** and on your PATH for video conversion:
> - macOS: `brew install ffmpeg`
> - Windows: `winget install Gyan.FFmpeg`
> - Linux: `sudo apt install ffmpeg`

> The placeholder images in `public/properties/` ship so the site renders out of
> the box — swap them (and the placeholder prices in `data/properties.ts`) for
> the real thing.

## WhatsApp CTAs

Every CTA is a `https://wa.me/<number>?text=<prefilled>` deep link built in
[`lib/whatsapp.ts`](lib/whatsapp.ts). Each prefilled message names the property
**and** the specific intent, so a tap is both lead qualification and attribution:

- Unit: `Hi Mwabili 👋 I'd like to enquire about staying in the *Cabin* at *Kamuthanga*. Is it available?`
- Day Pass: `Hi Mwabili 👋 I'd like to plan a day visit (park, eat, chill) at *Kamuthanga*.`
- Event: `Hi Mwabili 👋 I'd like to host an event (*Host an event*) at *Kamuthanga*.`

Set each property's real WhatsApp number in `data/properties.ts` (`whatsapp`
field, E.164 without the leading `+`, e.g. `2547XXXXXXXX`).

## Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, **New Project → Import** the repo. Framework preset auto-detects
   **Next.js**; no build settings needed (`next build`).
3. (Optional) Set `NEXT_PUBLIC_SITE_URL` to your production domain so Open Graph
   and canonical URLs are absolute. Defaults to `https://mwabili.vercel.app`.
4. Deploy. Each property page (`/<slug>`) is statically generated and has its own
   title, description, and OG image for sharing in TikTok bios and Google.

## Design system

Warm, calm, refined countryside escape — green, cream, and warm brown, generous
whitespace, editorial serif headings (Fraunces) over Inter body, rounded-2xl
cards, soft shadows, hairline taupe dividers, and a subtle fade/slide-in on
scroll. Tokens live in [`tailwind.config.ts`](tailwind.config.ts).

| Token   | Hex       | Use                |
| ------- | --------- | ------------------ |
| forest  | `#2F4A3C` | primary            |
| sage    | `#7B9A82` | secondary          |
| cream   | `#FAF8F3` | page background    |
| offwhite| `#FBFAF6` | cards              |
| brown   | `#8A6E55` | warm accent        |
| taupe   | `#C9B8A3` | dividers / accents |
| ink     | `#262A22` | text               |
| muted   | `#6B6F63` | muted text         |

## Scope (v1)

✅ Hub + property pages · units with prices · galleries (photo + video with
lightbox) · day/event/activity options · WhatsApp CTAs · OG metadata · media
conversion script · responsive premium UI.

❌ No payments, no live availability calendar, no user accounts, no admin panel.
The data file is the single source of truth. Search the code for `TODO(booking)`
and `TODO(analytics)` to see where the future commerce + analytics layer attaches.
