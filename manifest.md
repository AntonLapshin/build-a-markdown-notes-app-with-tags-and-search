# Build A Markdown Notes App With Tags And Search — Manifest

> Project charter / intent. This file is a living document maintained by the
> auto-pi PM persona as the project evolves.

## Status

**done** (for autonomous work) — the core milestone M1 is fully implemented,
merged, and CI-green with 100% core coverage. The project is complete as far as
the autonomous team can go. The only remaining success criterion — a live
GitHub Pages demo — is **blocked on a human decision** (the repository is
private, and GitHub Pages on the free plan requires a public repo). This
blocker is tracked in open issue #3 (`pi:needs-human` / `pi:blocked`).

completed_at: 2026-08-20T11:30:00Z (for autonomous work; Pages hand-off remains open for human).

## Purpose

Build a markdown notes app with tags and search

## Goals

- Deliver a small, testable, demoable slice of the idea.
- Keep all business logic in `src/core` with 100% test coverage.
- Keep the UI layer thin and free of business logic.

## Non-goals (initial slice)

- Anything beyond the minimal viable slice needed for a live demo.

## Success criteria

- [x] `npm install && npm test && npm run build` pass in CI.
- [ ] A live demo is deployed to GitHub Pages (BLOCKED on human: repo is private, Pages unavailable on free plan; see issue #3).
- [x] `src/core/**` holds 100% test coverage.

## Milestones

### M1 — Core notes domain (notes + tags) — COMPLETE ✅

Pure business logic for the notes app: the `Note` model (id, title, markdown
body, tags), note CRUD, tag normalization, and search/tag filtering — all in
`src/core` with 100% coverage.

- [x] #1 **M1-T1** Core notes model (id, title, markdown body, tags) with CRUD + tag normalization — merged (PR #4), closed.
- [x] #2 **M1-T2** Core search + tag filtering for notes — merged (PR #5), closed.

UI (view models + components) and Pages deployment are **out of scope for the
initial autonomous slice**; they require the human Pages decision (issue #3)
before a live demo can be delivered. No new core work is planned.
