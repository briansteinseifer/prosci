# Design

Visual system for the Prosci Course Finder, derived directly from the live Prosci
store (store.prosci.com, Hyvä/Tailwind theme). These tokens are the hard
constraint. They supersede any earlier `.superdesign` system: the store has **no
teal**, its secondary is **purple**, it **keeps orange/green/lilac** as accents,
its cards are **cream with a sand border**, and its corners are **small (3–8px)**.

## Theme

Light. Warm, near-cream surfaces under daytime office light. The user is an HR /
L&D professional evaluating training on a desktop, in a considered, unhurried
mindset. The interface should read as warm, editorial, and credible, never as a
dark tool or a cold enterprise dashboard.

## Color

OKLCH-minded but authored to match the store's exact hex tokens. Strategy:
**committed neutral + restrained accent.** Aubergine (damson) and warm cream carry
almost everything; one accent (pink) marks the single most important action and AI
moments. Categorical accents (purple, orange, green, lilac) appear rarely and only
to distinguish categories or states.

### Brand

- **Damson (primary)** `#350944` — brand, headings, nav, primary buttons, structure.
- **Purple (secondary)** `#5c1761` — secondary brand mark, hover/active on damson,
  secondary emphasis. This replaces teal entirely.

### Accents (use sparingly, one per context)

- **Pink (key action / AI)** `#ff1aa3` — the single most important action, the AI
  spark, one highlighted word. Treat as scarce.
- **Orange** `#f3902d` — categorical/secondary accent, highlights.
- **Green** `#d2f7a9` — positive categorical tint.
- **Lilac** `#b5bbdb` — soft categorical tint, decorative washes.
- **Gold** `#836434` — decorative only (radial-gradient hero washes on the store);
  never as text or a control color.

### Neutrals (warm, never gray-cold)

- **White / app background** `#fffefa` (`neutrals-white`)
- **Linen (cards, soft panels, default surface)** `#f6f4ed` (`neutrals-linen`)
- **Sand (borders, dividers, card edges)** `#f2e8de` (`neutrals-sand`)
- **Pure white** `#ffffff` — only where a surface must lift off linen.
- **Black (body text)** `#000000` (`neutrals-black`)
- **Neutral-50 (secondary text)** `#3e3e3e`
- **Neutral-20 (muted text / labels)** `#8c8c8c`

### State

- **Validation green** `#80ed99`
- **Validation red** `#de351b`

### Usage rules

- Damson for type and structure; pink for the one key action and AI; everything
  else is restraint. No rainbow.
- Default card surface is **linen `#f6f4ed`** with a **sand `#f2e8de`** border, not
  white. Reserve `#ffffff` for content that must visibly lift.
- Pink `#ff1aa3` is borderline for WCAG AA as small text on cream/white. Use it for
  large text, icons, fills, and accents; verify before using for body-size text.
- Never signal match strength or category by color alone; pair tint with a label.

## Typography

Two families, mirroring the store. The signature move is the serif editorial
headline over a clean sans body.

- **Serif (`--font-serif`)**: `"Baskervville", Cambria, serif`. Display headlines
  and major section headings. Weight 400; the elegance is in the serif, do not
  bold it heavily. Normal case, not uppercase.
- **Sans (`--font-sans`)**: `"Instrument Sans", Arial, ui-sans-serif, system-ui,
  sans-serif`. Everything else: body, labels, buttons, nav, meta, cards. (Open
  Sans exists as a legacy subset on the store; prefer Instrument Sans.)

### Scale (em-based, responsive small → large, from the store)

- **h1** 2.25em → 4.5em
- **h2** 2.06em → 3.44em
- **h3** 1.56em → 2.5em
- **h4** 1.5em → 1.875em
- **h5** 1.375em → 1.625em
- **h6** 1.25em → 1.375em
- **highlight (display)** 3em → 5em
- **x-large** 1.5em
- **base** 1.6rem (root is 62.5%, so 1rem = 10px → base ≈ 16px); small 1.4rem; x-small 1rem
- **Weights**: regular 400, bold 600. (No heavier weights; 600 is the top.)

### Rules

- Headlines: Baskervville serif, weight 400, line-height ~1.08–1.15, damson. A
  single key word may be set in pink for emphasis.
- Body: Instrument Sans, 400–500, line-height ~1.6, neutral-50 `#3e3e3e`. Cap line
  length at 65–75ch.
- Labels / eyebrows: Instrument Sans, small, weight 600, uppercase, tracked, muted
  `#8c8c8c`.

## Layout & Spacing

- **Catalog shape**: the store training page is a `2columns-left` layout (left
  filter sidebar + product grid). For the finder, the analog is a refinement rail
  beside the ranked results.
- **Grid**: product cards in a responsive grid (1 col → 2 → 3+), generous gap
  (Tailwind `gap-12` ≈ 3rem between cards).
- **Spacing scale** (Tailwind-based, store uses px-10 / pb-12 / pt-md etc.):
  4, 8, 12, 16, 24, 32, 48, 64, 96px. Vary spacing for rhythm; airy and editorial.
- **Content width**: centered, roughly 1200–1360px, comfortable side gutters.

## Corners, Borders, Shadows

- **Radius (small, store-true)**: default surfaces/cards `rounded-6` = **6px**;
  inputs and small controls 4–8px; pills/chips/badges/avatars 9999px; circles 50%.
  Squarer than typical SaaS, never large or brutalist.
- **Borders**: 1px **sand `#f2e8de`** on cards and inputs; hairline dividers in
  sand or damson-at-low-opacity.
- **Shadows**: minimal and warm. The store leans on borders + cream surfaces more
  than elevation. Use soft, damson-tinted shadows only where elevation is needed;
  never gray, never heavy.

## Components

- **Course / product card**: linen `#f6f4ed` background, 1px sand border, 6px
  radius, `overflow-hidden`. Flex column: image block on top, then product-info
  (generous horizontal padding ~px-10, bottom padding ~pb-12). Title in Instrument
  Sans (the store uses a large `text-4xl` training-product-title), damson. CTA
  pinned to the bottom (`mt-auto`). For the finder, add a "why this fits" line and
  a match badge.
- **Buttons**:
  - **Primary** (`btn button-primary`): damson `#350944` fill, white text,
    Instrument Sans 600, small radius, squarer (store CTAs are near-square). Hover
    shifts toward purple `#5c1761` or a darker damson. Key CTA labels may be
    uppercase/tracked.
  - **Secondary** (`btn button-secondary`): cream/white fill, 1px damson or sand
    border, damson text; hover fills cream.
  - **Small** variant: `btn-sm`.
- **Match badge / score**: pill (9999px), subtle tint, paired with a text label
  (e.g. "94% match"). Use pink tint for the top/key match, neutral tint otherwise.
- **Tag / filter chips**: pills, linen `#f6f4ed` background, secondary text;
  selected = damson fill + white text.
- **Search field (finder-specific)**: large, cream-on-white, 1px sand border,
  small radius, a leading pink AI-spark icon, primary damson submit button on the
  right. Focus grows a soft pink ring.
- **AI answer block (finder-specific)**: linen or very light pink wash, sand /
  damson-at-low-opacity hairline border, small radius, a "Prosci AI" label with a
  pink spark icon.
- **Nav bar**: sticky, cream `#fffefa`, 1px sand bottom border, damson wordmark,
  Instrument Sans 600 links, a small primary damson button on the right.

## Motion

- Fast, professional transitions (~0.2s ease). Subtle fade / slide-up (8–18px) as
  results appear. No bounce, no elastic; ease-out only.
- Search focus grows a soft pink ring.
- Decorative gold/lilac radial-gradient washes are allowed only behind hero areas,
  at low opacity (matching the store's `#836434` ellipse treatment).
- Honor `prefers-reduced-motion`: reveals and decorative washes degrade to none.

## Fidelity Rule

Use ONLY these fonts, colors, radii, and component patterns. Headlines are
**Baskervville serif**; body/UI is **Instrument Sans**. Palette is **damson +
warm cream** structure, **pink** for the one key action and AI, with **purple /
orange / green / lilac** as sparing categorical accents. Do **not** introduce
teal, the retired navy/blue palette, Inter, large/round radii, or any color, font,
or style not defined here.
