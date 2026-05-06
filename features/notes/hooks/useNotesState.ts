"use client";

import { useState, useEffect } from "react";
import { Note, NoteColor } from "../types";
import {
  getNotes,
  addNoteAction,
  updateNoteAction,
  deleteNoteAction,
} from "../actions";

export function useNotesState() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Initial Load from PostgreSQL
  useEffect(() => {
    let isMounted = true;

    const loadNotes = async () => {
      try {
        const data = await getNotes();
        if (!isMounted) return;

        const formatted: Note[] = data.map((note) => ({
          id: note.id,
          title: note.title,
          content: note.content,
          color: note.color as NoteColor,
          createdAt: note.createdAt instanceof Date ? note.createdAt.toISOString() : String(note.createdAt),
          updatedAt: note.updatedAt instanceof Date ? note.updatedAt.toISOString() : String(note.updatedAt),
        }));
        setNotes(formatted);
      } catch (e) {
        console.error("Failed to load notes from database:", e);
      } finally {
        if (isMounted) {
          setIsInitialized(true);
        }
      }
    };

    loadNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Add Note (with Optimistic Updates)
  const addNote = async (title: string, content: string, color: NoteColor) => {
    const tempId = crypto.randomUUID();
    const now = new Date().toISOString();
    const tempNote: Note = {
      id: tempId,
      title: title.trim(),
      content: content.trim(),
      color,
      createdAt: now,
      updatedAt: now,
    };

    // Optimistically update UI
    setNotes((prev) => [tempNote, ...prev]);

    const result = await addNoteAction(title, content, color);
    if (result.error) {
      // Rollback if failed
      setNotes((prev) => prev.filter((n) => n.id !== tempId));
    } else if (result.note) {
      // Replace with database note
      setNotes((prev) =>
        prev.map((n) =>
          n.id === tempId
            ? {
                id: result.note.id,
                title: result.note.title,
                content: result.note.content,
                color: result.note.color as NoteColor,
                createdAt: result.note.createdAt instanceof Date 
                  ? result.note.createdAt.toISOString() 
                  : String(result.note.createdAt),
                updatedAt: result.note.updatedAt instanceof Date 
                  ? result.note.updatedAt.toISOString() 
                  : String(result.note.updatedAt),
              }
            : n
        )
      );
    }
  };

  // 3. Update Note (with Optimistic Updates)
  const updateNote = async (
    id: string,
    updates: Partial<Pick<Note, "title" | "content" | "color">>
  ) => {
    const originalNote = notes.find((n) => n.id === id);
    if (!originalNote) return;

    // Optimistically update UI
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );

    const result = await updateNoteAction(id, updates);
    if (result.error) {
      // Rollback if failed
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? originalNote : note))
      );
    }
  };

  // 4. Delete Note (with Optimistic Updates)
  const deleteNote = async (id: string) => {
    const originalNote = notes.find((n) => n.id === id);
    if (!originalNote) return;

    // Optimistically update UI
    setNotes((prev) => prev.filter((note) => note.id !== id));

    const result = await deleteNoteAction(id);
    if (result.error) {
      // Rollback if failed
      setNotes((prev) =>
        [...prev, originalNote].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      );
    }
  };

  return {
    notes,
    isInitialized,
    addNote,
    updateNote,
    deleteNote,
  };
}
