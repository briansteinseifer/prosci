# Prosci Course Finder

An LLM-guided course finder for Prosci. A user describes a change-management
challenge in plain language and receives an AI recommendation plus a ranked set
of matching Prosci programs, each with an explicit "why this fits" rationale.

These are front-end prototypes: single-file HTML/CSS/JS, no build step. The AI
recommendation and match scoring are mocked/canned for demonstration.

## Versions

Each version is a distinct design. They share one design system (derived from the
live Prosci store) but diverge deliberately in how courses are presented and refined.

- **`index.html`** — version picker. The entry point; links to each design.
- **`version-a.html`** — *Photo cards.* Photo-forward course cards with a
  match-strength pill and Register / Join Waitlist actions; chip-based facet filters.
- **`version-b.html`** — *Reasoning cards.* Lavender-framed cards leading with a
  "Why this fits" rationale and an "Add to path" action; checkbox/radio filter panel.
- **`version-c.html`** — *Conversational.* A guided chat advisor that asks a couple
  of questions, then synthesizes a best-fit "Why this fits" recommendation with
  supporting courses and a running path you build as you go. (Tailwind CDN based.)

## Context

- **`PRODUCT.md`** — strategic product context (users, brand, principles).
- **`DESIGN.md`** — visual system, derived from the live Prosci store.
- **`previews/`** — thumbnails used by the picker page.

## Adding a version

1. Drop the new `version-*.html` in this directory.
2. Add a thumbnail to `previews/`.
3. Append one entry to the `VERSIONS` array in `index.html`. The picker renders the rest.

## Viewing

Open `index.html` in a browser, or visit the live build. Course imagery hotlinks
from the Prosci store CDN, so an internet connection is needed for photos to load.

## Notes for review

- Strikethrough "was" prices are illustrative (member pricing, shown via the info tooltip).
- Header, the "Prosci Advisor" recommendation module, and course cards follow the Figma source designs.
