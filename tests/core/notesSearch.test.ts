import { describe, it, expect } from "vitest";
import { createNote, type Note } from "../../src/core/notes";
import {
  searchNotes,
  filterNotesByTags,
} from "../../src/core/notesSearch";

/** Build a small fixture set of notes with distinct titles, bodies, and tags. */
function seed(): Note[] {
  return [
    createNote({ title: "Groceries", body: "# Shopping\n- milk", tags: ["Home", "Urgent"] }, "a"),
    createNote({ title: "React Hooks", body: "useState and useEffect basics", tags: ["Work", "Frontend"] }, "b"),
    createNote({ title: "Trip Plan", body: "pack a camera and sunscreen", tags: ["Personal", "Urgent"] }, "c"),
  ];
}

describe("searchNotes", () => {
  it("returns all notes unchanged for an empty query", () => {
    const notes = seed();
    expect(searchNotes(notes, "")).toEqual(notes);
    expect(searchNotes(notes, "   ")).toEqual(notes);
  });

  it("returns all notes unchanged for a whitespace-only query", () => {
    expect(searchNotes(seed(), " \t ")).toHaveLength(3);
  });

  it("matches against the title case-insensitively", () => {
    const result = searchNotes(seed(), "REACT");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("React Hooks");
  });

  it("matches against the markdown body", () => {
    const result = searchNotes(seed(), "camera");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Trip Plan");
  });

  it("matches body text that contains markdown syntax with surrounding whitespace", () => {
    const result = searchNotes(seed(), "  shopping  ");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Groceries");
  });

  it("returns an empty list when no note matches", () => {
    expect(searchNotes(seed(), "nonexistent-term")).toEqual([]);
  });

  it("returns multiple matching notes across title and body", () => {
    const result = searchNotes(seed(), "a");
    expect(result.length).toBeGreaterThan(1);
  });

  it("does not mutate the input list or its notes", () => {
    const notes = seed();
    const snapshot = JSON.stringify(notes);
    searchNotes(notes, "camera");
    expect(JSON.stringify(notes)).toBe(snapshot);
  });

  it("returns a fresh array, not the input reference", () => {
    const notes = seed();
    expect(searchNotes(notes, "")).not.toBe(notes);
  });
});

describe("filterNotesByTags", () => {
  it("returns all notes unchanged for an empty tag set", () => {
    const notes = seed();
    expect(filterNotesByTags(notes, [])).toEqual(notes);
  });

  it("returns all notes unchanged for whitespace-only tags", () => {
    const notes = seed();
    expect(filterNotesByTags(notes, ["  ", "\t"])).toEqual(notes);
  });

  it("matches notes that have ANY of the selected tags", () => {
    const result = filterNotesByTags(seed(), ["Personal", "Frontend"]);
    expect(result.map((n) => n.title).sort()).toEqual(["React Hooks", "Trip Plan"]);
  });

  it("matches a single tag case-insensitively", () => {
    const result = filterNotesByTags(seed(), ["URGENT"]);
    expect(result.map((n) => n.title).sort()).toEqual(["Groceries", "Trip Plan"]);
  });

  it("trims whitespace around selected tags", () => {
    const result = filterNotesByTags(seed(), ["  Work "]);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("React Hooks");
  });

  it("returns an empty list when no note has any selected tag", () => {
    expect(filterNotesByTags(seed(), ["nonexistent-tag"])).toEqual([]);
  });

  it("does not mutate the input list or its notes", () => {
    const notes = seed();
    const snapshot = JSON.stringify(notes);
    filterNotesByTags(notes, ["Urgent"]);
    expect(JSON.stringify(notes)).toBe(snapshot);
  });

  it("returns a fresh array for the empty-tag path", () => {
    const notes = seed();
    expect(filterNotesByTags(notes, [])).not.toBe(notes);
  });

  it("handles a note with no tags (does not match any selection)", () => {
    const untagged = createNote({ title: "Untagged", body: "x" }, "u");
    const result = filterNotesByTags([untagged], ["Anything"]);
    expect(result).toEqual([]);
  });
});
