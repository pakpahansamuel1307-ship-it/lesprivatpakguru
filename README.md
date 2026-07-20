# Pak Harinuan Pakpahan — Portfolio

A premium, single-page portfolio for a private Math/Physics/Chemistry tutor, built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP**, and **Lenis**.

The site is structured as five full-screen sections (Home, About, Subjects, Classes, Contact) that snap into place as you scroll, echoing a presentation deck — a deliberate nod to the fact that the original design was a 5-slide Canva deck.

---

## Getting started

Requires **Node.js 18.18+**.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

> **Note on this build:** this project was written by hand in an environment without package-registry access, so `npm install` / `next build` could not be executed here to verify it end‑to‑end. The code follows Next.js 15 / React 19 / Tailwind 3 conventions carefully, but **please run `npm install && npm run dev` as your first step** and let me know if anything needs a fix — I'd rather you catch it early than assume it's flawless.

---

## Project structure

```
app/
  layout.tsx        Root layout: fonts, SEO metadata, JSON-LD, providers
  page.tsx           Assembles the deck: nav, chrome, five sections
  globals.css         Base styles, custom cursor, reduced-motion handling
  sitemap.ts / robots.ts / manifest.ts

components/
  providers/          Lenis smooth-scroll, GSAP sync, dark mode, deck/snap controller
  layout/              Navigation, custom cursor, loading screen, indicators, back-to-top
  sections/            Hero, About, Subjects, Classes, Contact
  ui/                  Reusable pieces: buttons, stickers, section headings, blobs

lib/
  constants.ts        All site copy in one place — edit this to change text
  utils.ts

hooks/                useDeck, useLenis, useTheme, useReducedMotion
types/                 Shared TypeScript types
public/images/        Photos & subject imagery (sourced from your Canva export)
```

**To edit copy, phone number, social handles, or subject/class descriptions — everything lives in `lib/constants.ts`.** Nothing else needs to change.

---

## How the scroll-snap "deck" works

Rather than hijacking the scroll wheel directly (which tends to feel janky and breaks accessibility), the site uses **real document scroll**, smoothed by **Lenis**, synced every frame to **GSAP's ScrollTrigger**. A small controller (`components/providers/DeckProvider.tsx`) watches scroll position and, once scrolling settles for ~140ms, animates to the nearest section boundary with Lenis's own easing — giving the "changing PowerPoint slides" feel while still supporting normal trackpad/wheel/touch/keyboard scrolling, screen readers, and deep links (`/#subjects`).

Keyboard support: `↑ ↓ PageUp PageDown Home End`.

GSAP is also used for the Hero's entrance choreography (timeline-based, staggered), while Framer Motion drives most in-view reveals, hover states, and the layout-morphing navigation indicator — each library doing what it's best at rather than overlapping.

---

## Design tokens

Colors were sampled directly from your original Canva export rather than guessed:

| Token | Hex | Used for |
|---|---|---|
| `sunshine` | `#FFED00` | Primary brand yellow |
| `marigold` | `#F6CD46` | Secondary yellow, buttons |
| `ink` | `#15140D` | Near-black text/surfaces |
| `cream` | `#FCF5EB` | Warm background |
| `fog` | `#F1F1EA` | Section background |
| `terracotta` | `#BA4B2F` | Contact section |
| `periwinkle` | `#829CFF` | Math accent |
| `mint` | `#28C878` | Physics/About accent |

Type system: **Fredoka** (rounded display headlines, echoes the original chunky headline style), **Plus Jakarta Sans** (body), **Fraunces** (serif accent for the "Contact Me" moment, echoing the serif treatment in your original slide).

---

## Content notes / things worth double-checking

- **Contact channels:** only WhatsApp and TikTok are wired up, matching what was visible in your original Contact slide. I didn't invent an email address — if you have one you'd like listed, add it to `lib/constants.ts` (`CONTACT`) and a row in `components/sections/Contact.tsx`.
- **Class card photos:** `class-private.jpg`, `class-online.jpg`, and `class-flexible.jpg` were matched to the "Les Privat / Les Online / Jadwal Fleksibel" cards based on their content — please eyeball these once the dev server is running and swap files in `public/images/` if any are mismatched.
- **Stats** (17+ tahun, 3 mata pelajaran, etc.) are pulled from your About paragraph; the hero/about "stat chip" framing around them is my addition — adjust freely in `lib/constants.ts`.
- **OG image** (`public/images/og-image.jpg`) is a simple generated placeholder for social share previews — feel free to replace it with a proper design.

---

## Accessibility & performance

- Respects `prefers-reduced-motion`: disables Lenis smoothing, the custom cursor, and non-essential animation.
- All sections remain in normal DOM order for screen readers regardless of visual "slide" position; a skip-link jumps straight to `#home`.
- Focus-visible states, `aria-label`/`aria-current` on nav, semantic `<section>` landmarks, alt text on every image.
- Images use `next/image` with responsive `sizes`; only the hero photo is `priority`-loaded.

---

## Deploying

Any Next.js host works (Vercel is the path of least resistance). Update `SITE_URL` in `lib/constants.ts` to your real domain before deploying — it feeds the metadata, sitemap, and JSON-LD.
