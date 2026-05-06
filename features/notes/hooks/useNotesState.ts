"use client";

import { useState, useEffect } from "react";
import { Note, NoteColor } from "../types";

export function useNotesState() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // 1. Initial Load from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem("learn-next-notes");
            if (saved) {
                setNotes(JSON.parse(saved));
            }
        } catch (e) {
            console.error("Failed to parse notes from localStorage:", e);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    // 2. Auto-save Side Effect (triggers whenever notes change)
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("learn-next-notes", JSON.stringify(notes));
        }
    }, [notes, isInitialized]);

    // 3. Action Creators
    const addNote = (title: string, content: string, color: NoteColor) => {
        const now = new Date().toISOString();
        const newNote: Note = {
            id: crypto.randomUUID(),
            title: title.trim(),
            content: content.trim(),
            color,
            createdAt: now,
            updatedAt: now,
        };
        setNotes((prev) => [newNote, ...prev]);
    };

    const updateNote = (
        id: string,
        updates: Partial<Pick<Note, "title" | "content" | "color">>,
    ) => {
        setNotes((prev) =>
            prev.map((note) =>
                note.id === id
                    ? {
                          ...note,
                          ...updates,
                          updatedAt: new Date().toISOString(),
                      }
                    : note,
            ),
        );
    };

    const deleteNote = (id: string) => {
        setNotes((prev) => prev.filter((note) => note.id !== id));
    };

    return {
        notes,
        isInitialized,
        addNote,
        updateNote,
        deleteNote,
    };
}
