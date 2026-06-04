# Prosci Course Finder

An LLM-guided course finder for Prosci. A user describes a change-management
challenge in plain language and receives an AI recommendation plus a ranked set
of matching Prosci programs, each with an explicit "why this fits" rationale.

This is a front-end prototype: single-file HTML/CSS/JS, no build step. The AI
recommendation and match scoring are mocked/canned for demonstration.

## Files

- **`index.html`** — primary version. Focal landing search, split results view,
  photo course cards with match pill and Register / Join Waitlist CTAs.
- **`index-alt.html`** — alternate version. Same landing and results flow, with
  lavender-framed cards ("Why this fits" + "Add to path") and a checkbox/radio
  filter panel.
- **`PRODUCT.md`** — strategic product context (users, brand, principles).
- **`DESIGN.md`** — visual system, derived from the live Prosci store.

## Viewing

Open either HTML file directly in a browser. Course imagery hotlinks from the
Prosci store CDN, so an internet connection is needed for photos to load.

## Notes for review

- Strikethrough "was" prices are illustrative (member pricing, shown via the
  info tooltip).
- Header, the "Prosci Advisor" recommendation module, and course cards follow
  the Figma source designs.
