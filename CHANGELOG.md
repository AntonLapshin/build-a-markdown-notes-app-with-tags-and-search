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
