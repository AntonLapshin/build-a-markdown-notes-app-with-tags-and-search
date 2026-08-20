/**
 * Core notes search & tag filtering (plan.md §19.1, M1-T2).
 *
 * Pure functions that search and filter a list of `Note`s by query text or
 * tags. There is no React, DOM, or other browser dependency here; input notes
 * are never mutated.
 */

import type { Note } from "./notes";

/**
 * Normalize a user-supplied query for matching: trimmed and lowercased so that
 * searches are case-insensitive and whitespace-insensitive.
 */
function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

/**
 * Whether a note matches the given query. Matching is case-insensitive and
 * performed against both the title and the raw markdown body. An empty or
 * whitespace-only query matches every note.
 */
function noteMatchesQuery(note: Note, query: string): boolean {
  if (query.length === 0) {
    return true;
  }
  return note.title.toLowerCase().includes(query) ||
    note.body.toLowerCase().includes(query);
}

/**
 * Return the subset of `notes` whose title and/or markdown body contains the
 * given `query` (case-insensitive). An empty or whitespace-only query returns
 * all notes unchanged. The input list is not mutated and the returned list is a
 * fresh array.
 */
export function searchNotes(notes: readonly Note[], query: string): Note[] {
  const normalized = normalizeQuery(query);
  return notes.filter((note) => noteMatchesQuery(note, normalized));
}

/**
 * Return the subset of `notes` that have at least one tag in common with the
 * given `tags` (ANY semantics). An empty or whitespace-only set of tags returns
 * all notes unchanged. When non-empty, notes matching any of the selected tags
 * are included. The input list is not mutated and the returned list is a fresh
 * array.
 */
export function filterNotesByTags(
  notes: readonly Note[],
  tags: readonly string[],
): Note[] {
  const cleaned = tags.map((tag) => tag.trim().toLowerCase()).filter((t) => t.length > 0);
  if (cleaned.length === 0) {
    return [...notes];
  }
  const selectedSet = new Set(cleaned);
  return notes.filter((note) => note.tags.some((tag) => selectedSet.has(tag)));
}
