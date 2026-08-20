# Changelog

All notable changes to **Build A Markdown Notes App With Tags And Search** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial React + Tailwind + TypeScript scaffold (Vite).
- Core/UI separation with `src/core` (business logic) and `src/ui` (thin views).
- Vitest setup enforcing 100% coverage on `src/core/**/*.ts`.
- Initial demo panel rendering project name / status / demo info.
- Core notes domain (M1-T1): `Note` model (id, title, raw-markdown body, tags) with
  pure CRUD (`createNote`, `getNote`, `listNotes`, `updateNote`, `deleteNote`) and
  tag normalization (trim, lowercase, de-duplicate, drop empty) in `src/core/notes.ts`,
  covered at 100%.
- Core search + tag filtering (M1-T2): `searchNotes` (case-insensitive match against
  title and/or markdown body; empty/whitespace query returns all) and
  `filterNotesByTags` (ANY-tag semantics; empty/whitespace tag set returns all) in
  `src/core/notesSearch.ts`. Both are pure, non-mutating, and covered at 100%.

### Changed

- Marked project **complete for autonomous work**: Milestone M1 (core notes
  domain) fully merged and CI-green; `src/core/**` at 100% coverage; tests (45)
  and build passing. The live Pages demo remains **blocked on a human decision**
  (private repo; free-plan Pages requires public repo) and is tracked in #3.
