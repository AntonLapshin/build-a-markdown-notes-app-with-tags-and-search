/**
 * Core notes domain (plan.md §19.1, M1-T1).
 *
 * This module models a single note and provides pure CRUD operations plus tag
 * normalization. It is pure TypeScript with no React or DOM dependencies:
 * the `body` is kept as a raw markdown string and is never rendered here.
 */

/** A markdown note. `body` is raw markdown, kept unmodified by core logic. */
export interface Note {
  /** Unique, stable identifier for the note. */
  id: string;
  /** Display title of the note. */
  title: string;
  /** Raw markdown body of the note. Never rendered or modified in core. */
  body: string;
  /** Normalized tags (trimmed, lowercased, de-duplicated, non-empty). */
  tags: string[];
}

/** Inputs used to create a Note. */
export interface NoteInput {
  title: string;
  body: string;
  /** Raw tags; they are normalized before storage. */
  tags?: string[];
}

/** The subset of note fields that can be updated. */
export interface NoteChanges {
  title?: string;
  body?: string;
  tags?: string[];
}

/** Monotonic counter used to keep generated ids unique within a session. */
let idCounter = 0;

/** A tag is considered valid when it is a non-empty string after trimming. */
function isValidTag(tag: string): boolean {
  return tag.trim().length > 0;
}

/**
 * Normalize a list of raw tags: each tag is trimmed and lowercased, empty or
 * whitespace-only values are dropped, and duplicates are removed while preserving
 * first-seen order.
 */
export function normalizeTags(tags: readonly string[]): string[] {
  const seen = new Set<string>();
  const normalized: string[] = [];
  for (const raw of tags) {
    const tag = raw.trim().toLowerCase();
    if (isValidTag(tag) && !seen.has(tag)) {
      seen.add(tag);
      normalized.push(tag);
    }
  }
  return normalized;
}

/**
 * Generate a unique, stable id for a new note. Ids are unique within a single
 * runtime session; combining a prefix with a monotonic counter avoids collisions
 * across repeated calls.
 */
export function nextNoteId(prefix = "note"): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/** Create a new note with a unique, stable id and normalized tags. */
export function createNote(input: NoteInput, prefix = "note"): Note {
  return {
    id: nextNoteId(prefix),
    title: input.title.trim(),
    body: input.body,
    tags: normalizeTags(input.tags ?? []),
  };
}

/** Read a single note by id, or undefined if it does not exist. */
export function getNote(notes: readonly Note[], id: string): Note | undefined {
  return notes.find((note) => note.id === id);
}

/** List all notes (returns a shallow copy so callers cannot mutate the source). */
export function listNotes(notes: readonly Note[]): Note[] {
  return [...notes];
}

/**
 * Update an existing note by id. Returns a new list where the matching note is
 * replaced with a copy carrying the applied changes; fields not present in
 * `changes` are preserved. Existing tags are re-normalized after merging. If no
 * note with the given id exists, the original list is returned unchanged.
 */
export function updateNote(
  notes: readonly Note[],
  id: string,
  changes: NoteChanges,
): Note[] {
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) {
    return [...notes];
  }
  const current = notes[index];
  const title = changes.title !== undefined ? changes.title.trim() : current.title;
  const body = changes.body !== undefined ? changes.body : current.body;
  const tags =
    changes.tags !== undefined ? changes.tags : current.tags;
  const updated: Note = {
    id: current.id,
    title,
    body,
    tags: normalizeTags(tags),
  };
  const next = [...notes];
  next[index] = updated;
  return next;
}

/**
 * Delete a note by id. Returns a new list without the matching note; if no note
 * with the given id exists, the original list is returned unchanged.
 */
export function deleteNote(notes: readonly Note[], id: string): Note[] {
  return notes.filter((note) => note.id !== id);
}
