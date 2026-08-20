# Build A Markdown Notes App With Tags And Search — Project State

> Current state and progress. Updated by the auto-pi loop as work is done.

## Status

**In progress — Milestone M1 (core notes domain) in progress.**

The React + Tailwind + TypeScript scaffold is in place and verified locally
(tests pass, 100% core coverage, build succeeds). M1-T1 (core notes model with
CRUD + tag normalization) is implemented and covered at 100%.

## What's here

- Vite + React + TypeScript + Tailwind project scaffold.
- Core/UI split with `src/core` (business logic) and `src/ui` (thin views).
- Vitest with 100% coverage enforced on `src/core/**/*.ts` (passing locally).
- CI + GitHub Pages workflow files (`.github/workflows/`).
- An initial demo panel rendering project name / status / demo info.
- README contains the live demo URL (Pages not yet deployed).

## Planned (Milestone M1 — core notes domain)

- [x] #1 **M1-T1** Core notes model (id, title, markdown body, tags) with CRUD + tag normalization.
- [ ] #2 **M1-T2** Core search + tag filtering for notes.

## Next steps (after M1)
- [ ] UI slice: note view model + list/editor components wired to core.
- [ ] CI runs green on `main`; Pages deployed and demo live.
