import { describe, it, expect } from "vitest";
import {
  normalizeTags,
  createNote,
  getNote,
  listNotes,
  updateNote,
  deleteNote,
  nextNoteId,
  type Note,
} from "../../src/core/notes";

describe("normalizeTags", () => {
  it("trims, lowercases, de-duplicates, and drops empty tags", () => {
    expect(
      normalizeTags(["  Work ", "work", " #React", "", "  ", "Personal"]),
    ).toEqual(["work", "#react", "personal"]);
  });

  it("returns an empty array for empty or all-invalid input", () => {
    expect(normalizeTags([])).toEqual([]);
    expect(normalizeTags(["", "   "])).toEqual([]);
  });

  it("preserves first-seen order when de-duplicating", () => {
    expect(normalizeTags(["TagA", "taga", "tagb", "TAGB", "tagc"])).toEqual([
      "taga",
      "tagb",
      "tagc",
    ]);
  });

  it("does not mutate the input array", () => {
    const input = ["  Work ", "work"];
    const original = [...input];
    normalizeTags(input);
    expect(input).toEqual(original);
  });
});

describe("nextNoteId", () => {
  it("generates unique ids using the default and custom prefixes", () => {
    const a = nextNoteId();
    const b = nextNoteId("note");
    const c = nextNoteId();
    expect(a).not.toBe(b);
    expect(b).not.toBe(c);
    expect(a).toMatch(/^note-/);
  });
});

describe("createNote", () => {
  it("creates a note with a unique id and normalized tags", () => {
    const note = createNote({
      title: "  Groceries  ",
      body: "# Shopping\n- milk",
      tags: ["  Home ", "home", " urgent "],
    });
    expect(note.id).toMatch(/^note-/);
    expect(note.title).toBe("Groceries");
    expect(note.body).toBe("# Shopping\n- milk");
    expect(note.tags).toEqual(["home", "urgent"]);
  });

  it("keeps body as raw markdown (no trimming or rendering)", () => {
    const note = createNote({ title: "T", body: "  # Raw md  " });
    expect(note.body).toBe("  # Raw md  ");
  });

  it("treats missing tags as an empty list", () => {
    const note = createNote({ title: "T", body: "b" });
    expect(note.tags).toEqual([]);
  });

  it("accepts a custom id prefix", () => {
    const note = createNote({ title: "T", body: "b" }, "custom");
    expect(note.id).toMatch(/^custom-/);
  });
});

describe("note CRUD", () => {
  const seed = (): Note[] => [
    createNote({ title: "First", body: "# A", tags: ["Work"] }, "a"),
    createNote({ title: "Second", body: "# B", tags: ["personal"] }, "b"),
  ];

  it("listNotes returns a shallow copy", () => {
    const notes = seed();
    const listed = listNotes(notes);
    expect(listed).toEqual(notes);
    expect(listed).not.toBe(notes);
  });

  it("getNote finds a note by id", () => {
    const notes = seed();
    expect(getNote(notes, notes[0].id)?.title).toBe("First");
  });

  it("getNote returns undefined for an unknown id", () => {
    expect(getNote(seed(), "missing")).toBeUndefined();
  });

  it("updateNote replaces the matching note with applied changes", () => {
    const notes = seed();
    const updated = updateNote(notes, notes[0].id, {
      title: "  Renamed  ",
      tags: ["  WORK ", "extra"],
    });
    expect(updated).toHaveLength(2);
    expect(updated[0].title).toBe("Renamed");
    expect(updated[0].tags).toEqual(["work", "extra"]);
    expect(updated[0].body).toBe("# A");
    expect(updated[1]).toEqual(notes[1]);
    // original is not mutated
    expect(notes[0].title).toBe("First");
  });

  it("updateNote preserves fields not present in changes", () => {
    const notes = seed();
    const updated = updateNote(notes, notes[1].id, { title: "S2" });
    expect(updated[1]).toEqual({
      id: notes[1].id,
      title: "S2",
      body: "# B",
      tags: ["personal"],
    });
    expect(notes[1].tags).toEqual(["personal"]);
  });

  it("updateNote returns an unchanged copy for an unknown id", () => {
    const notes = seed();
    const updated = updateNote(notes, "missing", { title: "X" });
    expect(updated).toEqual(notes);
    expect(updated).not.toBe(notes);
  });

  it("updateNote changing only tags preserves title and body", () => {
    const notes = seed();
    const updated = updateNote(notes, notes[1].id, { tags: ["new-tag"] });
    expect(updated[1].title).toBe("Second");
    expect(updated[1].body).toBe("# B");
    expect(updated[1].tags).toEqual(["new-tag"]);
  });

  it("updateNote trims title and keeps body raw when changed", () => {
    const notes = seed();
    const updated = updateNote(notes, notes[0].id, {
      title: "  Trimmed  ",
      body: "  raw md body  ",
    });
    expect(updated[0].title).toBe("Trimmed");
    expect(updated[0].body).toBe("  raw md body  ");
  });

  it("deleteNote removes the matching note", () => {
    const notes = seed();
    const remaining = deleteNote(notes, notes[0].id);
    expect(remaining).toHaveLength(1);
    expect(remaining[0].title).toBe("Second");
    // original is not mutated
    expect(notes).toHaveLength(2);
  });

  it("deleteNote returns an unchanged copy for an unknown id", () => {
    const notes = seed();
    const remaining = deleteNote(notes, "missing");
    expect(remaining).toEqual(notes);
    expect(remaining).not.toBe(notes);
  });

  it("ids are unique and stable across create/update/delete", () => {
    const notes = seed();
    const id = notes[0].id;
    const updated = updateNote(notes, id, { title: "Changed" });
    expect(updated[0].id).toBe(id);
    const afterDelete = deleteNote(updated, id);
    expect(afterDelete.find((n) => n.id === id)).toBeUndefined();
  });
});
