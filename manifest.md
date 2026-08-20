# Build A Markdown Notes App With Tags And Search — Manifest

> Project charter / intent. This file is a living document maintained by the
> auto-pi PM persona as the project evolves.

## Purpose

Build a markdown notes app with tags and search

## Goals

- Deliver a small, testable, demoable slice of the idea.
- Keep all business logic in `src/core` with 100% test coverage.
- Keep the UI layer thin and free of business logic.

## Non-goals (initial slice)

- Anything beyond the minimal viable slice needed for a live demo.

## Success criteria

- [ ] `npm install && npm test && npm run build` pass in CI.
- [ ] A live demo is deployed to GitHub Pages.
- [ ] `src/core/**` holds 100% test coverage.

## Milestones

### M1 — Core notes domain (notes + tags)

Pure business logic for the notes app: the `Note` model (id, title, markdown
body, tags), note CRUD, tag normalization, and search/tag filtering — all in
`src/core` with 100% coverage. UI (view models + components) and Pages
deployment are planned in subsequent milestones once the core API is stable.
