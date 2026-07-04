# Fable Suggestions — Modernizing Autodoprava Kopeček

An audit of the current site with concrete suggestions to make it feel modern, professional,
and distinctly *not* AI-generated. Organized by impact. File/line references point at the
code as of this audit.

---

## 1. The big picture — why the site currently reads as "AI-made"

The site is technically solid (good a11y, reduced-motion support, i18n), but visually it
assembles the most common LLM-generated building blocks:

| Tell | Where |
|---|---|
| Floating white glass card centered over a hero slideshow (`bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl`) | `src/app/_sections/Header.tsx:70` |
| Uniform icon-card grids (tinted icon badge + bold title + small gray text, ×3 sections) | `Services.tsx:52-77`, `About.tsx:39-56`, `Fleet.tsx:131-161` |
| The same card recipe on every card: `bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:-translate-y-0.5` | `Services.tsx:68`, `Fleet.tsx:135` |
| Gray gradient washes as section backgrounds (`bg-gradient-to-b from-white to-gray-200` …) | `Services.tsx:47`, `About.tsx:21`, `Fleet.tsx:123` |
| Centered accent bar + centered heading + centered body text on every single section | `components/ui/SectionHeading.tsx`, `globals.css:51-58` |
| `uppercase tracking-widest` subtitle under the hero headline | `Header.tsx:75` |
| Default system font (Arial) with no typographic identity | `globals.css:14` |
| Near-empty Tailwind theme — no brand tokens, raw `yellow-500`/`gray-900` sprinkled everywhere | `tailwind.config.ts` |

None of these are wrong individually; together they are the template look. The fix is not
"more decoration" — it's **typographic identity, asymmetry, and differentiated section
layouts**.

### Suggested design direction

A trucking/coach company already owns a great palette: **black, white, and signal yellow**.
Lean into an industrial, confident look instead of the soft SaaS look:

- Flat surfaces and hairline borders instead of shadows and glass.
- One dark ("black") section to break the all-light page rhythm — dark sections with
  yellow accents read as premium in transport/logistics branding.
- Left-aligned, editorial typography. Big, condensed, confident headlines.
- Photography does the emotional work (the fleet photos are the real asset) — let images
  bleed larger instead of shrinking them into cards.

---

## 2. Global foundations (do these first — everything else builds on them)

### 2.1 Typography — replace Arial (highest single-impact change)
`globals.css:14` sets `font-family: Arial, Helvetica, sans-serif`. Nothing says "unfinished"
like Arial.

- Load fonts via `next/font/google` in `src/app/layout.tsx` (zero layout shift, self-hosted).
- Suggested pairing for a transport brand:
  - **Headings:** `Archivo` (Expanded/SemiExpanded weights) or `Barlow Condensed` — both have
    an industrial/signage character that suits buses and freight. `Space Grotesk` is a safer
    third option.
  - **Body:** `Inter` or `Archivo` regular. All three cover Czech diacritics (latin-ext).
- Wire them into `tailwind.config.ts` as `fontFamily.sans` / `fontFamily.display`.
- Use fluid heading sizes (`text-4xl md:text-6xl` with `tracking-tight`, or CSS `clamp()`)
  instead of the current four-step ladder at `Header.tsx:72`.

### 2.2 Design tokens
`tailwind.config.ts` only defines `background`/`foreground`. Add:

- `colors.brand` scale (the yellow — pick one canonical value, currently `yellow-500`,
  `yellow-400`, `yellow-50`, `yellow-200`, `#eab308` are all used ad hoc).
- `colors.ink` (the gray-900 dark) so a future rebrand is one-line.
- A `container` config or a shared `.container-site` class — see §4.1.

### 2.3 Kill the gray gradient section backgrounds
`Services.tsx:47`, `About.tsx:21`, `Fleet.tsx:123` each fade between grays. Replace with a
deliberate rhythm, e.g.:

- Hero (photo) → About (white) → Services (near-white `gray-50` OR dark `ink` section) →
  Fleet (white) → Contact (map/photo) → Footer (dark).
- Flat colors + generous whitespace look modern; gradients between two grays look 2023-AI.

### 2.4 Depth system: borders over shadows
Pick one elevation language. Suggestion: `border border-gray-200` flat cards, **no** default
shadow, and reserve shadow for genuinely floating elements (nav dropdown, mobile menu).
Update `Button.tsx` (`shadow-md hover:shadow-lg`) and both card recipes accordingly.

---

## 3. Section-by-section modernization

### 3.1 Hero (`src/app/_sections/Header.tsx`)
Current: 9-image crossfade slideshow, dark gradient overlay, centered glass card with two
buttons. This is the #1 "AI site" signature.

Suggestions:
- **Drop the floating card.** Set the text directly on the image, anchored bottom-left,
  with a subtle bottom-up scrim (`bg-gradient-to-t from-black/70 via-black/20 to-transparent`)
  only where the text sits. White display-type headline, yellow accent word or underline.
- Left-align the headline and CTAs; move the slide indicator (`SlideDots`) to bottom-right,
  or replace with a minimal `01 / 09` counter + thin progress bar that fills over the 8s
  interval — communicates the slideshow without dots.
- Drop the `uppercase tracking-widest` subtitle style (`Header.tsx:75`); render the subtitle
  as a normal-case lead-in above the headline (small, yellow, `font-medium`).
- Consider a very slow Ken Burns zoom (`scale(1) → scale(1.05)` over the slide duration,
  already gated by `usePrefersReducedMotion`) — adds production value for free.
- 9 hero images is a lot; curate the best 4–5. Fewer, better photos feel more professional.
  All 9 also sit in the DOM as stacked absolutely-positioned layers from first paint
  (`Header.tsx:49-62`) — render only the active + next slide to lighten mobile loads.
- **Show the phone number on mobile.** `Header.tsx:85` hides it below `sm`
  (`hidden sm:inline`). Phone is this business's primary conversion channel; users often
  want to read/copy the number, not just tap-to-call. Keep it visible at every size.

### 3.2 Navbar (`src/app/components/Navbar.tsx`)
Solid functionally. Modernization polish:

- `h-12` (48px) is cramped for a brand header; 56–64px breathes better and gives the logo
  room (the brand text at `text-[10px]`, line 58, is squint-sized — with a proper display
  font it can be 12–13px).
- Add an active-section state: highlight the nav item for the section currently in view
  (IntersectionObserver) — a small touch that reads as "hand-built".
- Animate the mobile menu (height/opacity transition instead of the `hidden`/`block` snap
  at line 151-153) and consider a full-screen overlay menu on mobile — big tap targets,
  brand moment.
- The nav links only appear at `lg` (line 64). With 4 short links they fit at `md` —
  tablets currently get a hamburger unnecessarily.

### 3.3 Services (`src/app/_sections/Services.tsx`)
Current: a 4-up grid of yellow icon circles, then a 4-up grid of identical white cards.
Two stacked uniform icon grids is the strongest slop signal on the page.

Suggestions:
- **Qualities (safety/comfort/capacity/luggage):** compress into a slim horizontal strip —
  one row on desktop with hairline vertical dividers, inline icon + short label + one-line
  text, left-aligned. On mobile it becomes a 2×2 grid. No badges, no cards.
- **Transport types (8 items):** stop treating all 8 as equal cards. Options, best first:
  1. **Photo tiles:** you have real photos — a bento-style grid where 2–3 primary services
     (corporate, cargo, airport) get large image tiles with a dark scrim + title, and the
     remaining ones get compact text rows underneath.
  2. **Editorial list:** a two-column list with a numbered index (`01 Školní doprava …`),
     title + one-liner, hairline row dividers, hover reveals an arrow. Very "agency site",
     zero cards.
- If cards stay, differentiate: left-align text, remove the icon badge backgrounds (bare
  20px stroke icon in `ink`), replace `rounded-2xl` + shadow with a flat hairline border,
  and let hover change the border/underline color instead of `-translate-y-0.5`.

### 3.4 About (`src/app/_sections/About.tsx`)
Current: centered paragraphs, then a white card with three yellow icon circles.

Suggestions:
- Split layout: text left (left-aligned, `max-w-prose`), a photo of the team/depot or a
  **stat block** right. Stats a transport customer actually cares about: years in business,
  fleet size, passengers/km per year, coverage. Big display-font numbers + small labels —
  a modern replacement for the icon-circle trio at lines 39-56.
- The mixed alignment bug at line 29 (`md:text-left text-center` fights `mx-auto`) goes away
  with the redesign; pick left-aligned.
- This is a good candidate for the **dark section** (ink background, white text, yellow
  numerals) to break the page rhythm.

### 3.5 Fleet (`src/app/_sections/Fleet.tsx`)
This is the money section — customers come to see the buses — but the vehicles get the
smallest images on the page.

Suggestions:
- Go media-first: 2 columns on desktop (not 4), each vehicle tile dominated by its photo at
  a consistent aspect ratio (`aspect-[4/3]`, `object-cover`). Bigger photos = more
  professional, and it fixes the fixed-350px sizing issues (§4.2). The current square
  350×350 render also crops landscape bus photos hard on both sides and has no
  `object-cover`, so non-square sources risk distortion (`Fleet.tsx:64-79`).
- Replace `rounded-[15%]` (line 73) — a 15% radius on a square photo reads as a squircle
  app icon, not a vehicle photo. Use `rounded-lg`/`rounded-xl` or square with a hairline
  border.
- Feature icons (lines 142-155) are icon-only with `title` tooltips — invisible affordance
  on touch. Render them as small labeled chips (`icon + "Klimatizace"`, `bg-gray-100
  rounded-full px-2.5 py-1 text-xs`) — scannable and self-explanatory.
- Add seat/capacity as the primary spec line under the name (bold, e.g. "57 míst") —
  it's the #1 question when chartering a bus.
- The half-visible neighbouring slide (`opacity-0.5` peek) is actually a nice touch — keep
  the peek pattern but with fluid slide widths (§4.2).

### 3.6 Contact + footer (`src/app/_sections/Contact.tsx`)
The map-background + white card concept is fine; execution polish:

- Consider merging contact into a **dark footer block** (ink background): contact channels
  left, billing info + logo right, map either as a subtle darkened background or an actual
  embedded interactive map. One strong dark closing block feels more contemporary than
  card-over-image.
- `break-all` on the email (line 83) can split mid-word (`info@autob\nusy…`); use
  `break-words` or `overflow-wrap:anywhere`.
- The `{contact.mapLabel} →` arrow (line 50) — replace the literal `→` character with a
  lucide `ArrowUpRight` for consistency with the icon set.
- Hours row: if it's effectively "by phone, anytime", say that plainly — a fake
  opening-hours row looks templated.
- The email CTA button (line 133-136) is labeled with a noun ("Email") next to a verb
  primary ("Zavolat"). Make it "Napsat email" / "Send email" — parallel action labels.
- The footer (lines 141-147) is copyright-only. On a long single-page site, add a compact
  footer nav (section links + back-to-top) so users at the bottom aren't forced to scroll
  back to the sticky navbar.

### 3.7 SectionHeading (`src/app/components/ui/SectionHeading.tsx`)
The centered-yellow-bar-over-centered-title pattern appears on all four sections and is a
strong template tell.

- Left-align headings by default; give sections an optional kicker (small yellow uppercase
  label, e.g. "NAŠE SLUŽBY") *above* a large display-font title. Keep the accent bar only
  if left-aligned and attached to the kicker, not floating centered.
- Vary heading scale per section — the hero deserves a much larger jump than sub-sections.

---

## 4. Responsiveness — mobile & tablet

### 4.1 Inconsistent, extreme horizontal padding
Every section repeats `px-4 sm:px-8 md:px-16 lg:px-32` (`Services.tsx:47`, `About.tsx:21`,
`Fleet.tsx:123`, `Contact.tsx:24`). Problems:

- `lg:px-32` = 256px of padding at a 1024px viewport → the max-w-6xl content area shrinks
  to 768px, so the 4-column grids render ~170px-wide cards on small laptops/landscape
  tablets — cramped titles and wrapping.
- `md:px-16` on portrait tablets (768px) leaves 640px for 2-col grids — acceptable but tight.

Fix: one shared container (`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8`) used by every section;
let `max-w` do the constraining, not padding.

### 4.2 Fleet carousel: fixed 350px slides inside ~230px cards
`Fleet.tsx:64-79` renders slides at a hard `width={350}` while the 4-col card content area
is ~230px at `lg`. Consequences: slide width ≠ viewport width, so `scrollToIndex` /
`handleScroll` (which use `children[0].clientWidth`) drift, snap points misalign, and the
active-dot sync is off by fractions.

Fix: make each slide `w-full flex-shrink-0` (or `w-[85%]` for the peek effect) with
`aspect-[4/3]` + `fill`/`object-cover`, and compute positions from `track.clientWidth`.
Combined with the 2-column fleet layout (§3.5) this becomes robust at every breakpoint.

### 4.3 Grid breakpoints skip the tablet middle step
`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (`Services.tsx:52,64`, `Fleet.tsx:131`) jumps
from 2 to 4 columns at 1024px. With the heavy `lg:px-32` this is where cards get crushed.
If 4-up grids survive the redesign, add `md:grid-cols-3` or move the 4-up switch to `xl`.

### 4.4 Hero on short/landscape screens
`Header.tsx:47` uses `height: calc(100dvh - 48px)` with `minHeight: 480px`. On a landscape
phone (~375px tall) the section scrolls internally past the card + slide dots; the dots at
`bottom-3` can collide with the card. Worth a `max-height` guard on the card or hiding the
dots below `sm` height (`@media (max-height: 500px)`).

### 4.5 Touch-target & mobile polish
- Feature-icon tooltips (Fleet) don't exist on touch — fixed by labeled chips (§3.5).
- Slide dots and carousel arrows already meet 44px — good, keep.
- The two hero CTAs stack full-width on mobile (`flex-col sm:flex-row`) — good; apply the
  same stacking to the Contact CTAs (already done, line 128). Consistent.
- Mobile menu: add `overscroll-contain` and lock body scroll while open; right now the page
  scrolls behind the open menu.

---

## 5. Content & i18n integrity (found by audit — quick wins)

These don't change the design but undermine the "professional" feel if left in place:

- **404 and error pages are Czech-only.** `src/app/not-found.tsx:9-13` and
  `src/app/error.tsx:8-11` render hardcoded Czech regardless of locale — an English/German
  visitor hitting a bad URL gets "Stránka nenalezena". They live outside the `[locale]`
  segment; either add locale-scoped error pages or detect locale client-side.
- **Skip link is always Czech.** `src/app/layout.tsx:44` — "Přeskočit na obsah" is read to
  keyboard/screen-reader users on all three locales.
- **Language switcher `aria-label` is hardcoded Czech.** `Navbar.tsx:81`
  (`Změnit jazyk (aktuální: …)`) — move to the translated texts.
- **Wrong vehicle photos?** `src/content/defaults.ts` — the "Mercedes-Benz Viano" entry
  points at `/pics/man.jpg`, `/pics/man1.jpg`, … *Verified: the photos do show a black
  Mercedes V-class van; the files are merely misnamed. No action needed.*
- **Dead content key.** `services.list` in `defaults.ts:50-54` is translated in all three
  locales but never rendered anywhere — remove it or use it, otherwise it confuses editors
  in the `/dev` dashboard.
- **Use the real proof points.** The content already contains "od roku 2012"
  (`defaults.ts:19`) — surface concrete facts (years running, fleet size, region) in the
  About stats block (§3.4) instead of the generic flexibility/speed/professionalism trio
  every competitor claims.

---

## 6. Motion & micro-interactions (restraint > quantity)

- One reveal pattern max: a subtle fade+4px-rise on section entry via IntersectionObserver,
  gated by `usePrefersReducedMotion` (hook already exists). Skip staggered card cascades —
  that's the slop pattern.
- Button: replace `active:translate-y-px` + shadow swap with a color/arrow micro-interaction
  (e.g. arrow icon nudges right on hover). Flat, quick (150ms), `ease-out`.
- Hero slideshow: progress-bar indicator tied to `SLIDE_INTERVAL_MS` (§3.1).
- Keep the excellent reduced-motion global kill-switch (`globals.css:21-32`).

---

## 7. Suggested execution order

1. **Foundations** — next/font typography, Tailwind brand tokens, shared container class,
   flat depth system. (§2) *Small diff, transforms the feel of every section.*
2. **Content & i18n quick wins** — localized 404/error/skip-link/aria-labels, verify Viano
   photos, remove dead keys. (§5) *No design risk, immediate professionalism.*
3. **Hero redesign** — remove glass card, editorial left-aligned type, slide progress,
   visible phone number. (§3.1)
4. **Services restructure** — qualities strip + photo-tile/list treatment. (§3.3)
5. **Fleet media-first cards** + fluid carousel fix + labeled feature chips. (§3.5, §4.2)
6. **About → stats/dark section.** (§3.4)
7. **Contact/footer merge + polish + footer nav.** (§3.6)
8. **Responsive sweep** — container unification, grid breakpoints, hero landscape guard. (§4)
9. **Micro-interactions.** (§6)

Items 1, 2 and 8 are pure wins with no design risk; 3–7 change the look and are worth a
quick owner sign-off per section.
