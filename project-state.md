# Build A Markdown Notes App With Tags And Search — Project State

> Current state and progress. Updated by the auto-pi loop as work is done.

## Status

**COMPLETE for autonomous work** — Milestone M1 (core notes domain) is fully
implemented, reviewed, merged, and auto-closed. CI is green on `main`, tests
pass, `src/core/**` is at 100% coverage, and the build succeeds.

The only remaining success criterion — a **live GitHub Pages demo** — is
**blocked on a human decision**. The repository is private, and GitHub Pages on
the free plan requires a public repo. This is tracked in open issue #3
(`type:infra`, `pi:needs-human`, `pi:blocked`). The autonomous team cannot
resolve it and will not retry Pages automatically; the human must make the repo
public (or enable Pages / upgrade) and re-run the deploy workflow.

## What's here

- Vite + React + TypeScript + Tailwind project scaffold.
- Core/UI split with `src/core` (business logic) and `src/ui` (thin views).
- **Core notes domain (M1) — complete**: `src/core/notes.ts` (Note model, CRUD,
  tag normalization) and `src/core/notesSearch.ts` (search + tag filtering),
  both pure and 100% covered.
- Vitest with 100% coverage enforced on `src/core/**/*.ts` (passing locally and in CI).
- CI workflow green on `main`; GitHub Pages deploy workflow exists but fails
  (private repo — blocked, needs human).
- An initial demo panel rendering project name / status / demo info.
- README contains the live demo URL (not yet live pending human Pages decision).

## Verification (as of completion)

- `npm test` — 45 tests pass.
- `npm run test:coverage` — 100% across all `src/core/**` files.
- `npm run build` — succeeds.
- CI on `main` — passes (Deploy-to-Pages is the only failing workflow, and it is
  blocked on the human Pages decision, not a code error).

## Milestones

### M1 — Core notes domain — COMPLETE ✅
- [x] #1 **M1-T1** Core notes model (id, title, markdown body, tags) with CRUD + tag normalization (PR #4, merged).
- [x] #2 **M1-T2** Core search + tag filtering for notes (PR #5, merged).

## Remaining / blocked
- [ ] **Blocked (human):** GitHub Pages deployment (#3, `pi:needs-human`
      /`pi:blocked`). Make repo public (or enable private Pages) and re-run the
      deploy workflow to satisfy the live-demo success criterion.
- No new core work is planned for the autonomous team.

## Next steps (human)
- Resolve #3: make the repository public / enable Pages with a GitHub Actions
  source, then push or re-run the deploy workflow. The demo URL is already in
  README.md.
