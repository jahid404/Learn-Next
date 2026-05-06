"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NoteForm } from "@/features/notes/components/NoteForm";
import { NotesList } from "@/features/notes/components/NotesList";
import { useNotesState } from "@/features/notes/hooks/useNotesState";
import Link from "next/link";

export default function NotesPage() {
    const { notes, isInitialized, addNote, updateNote, deleteNote } =
        useNotesState();

    return (
        <div className="flex flex-col gap-6 max-w-2xl w-full mx-auto mt-6">
            {/* Navigation back to Home */}
            <Link
                href="/"
                className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors w-fit flex items-center gap-1.5"
            >
                ← Back to Learning Home
            </Link>

            {/* Note Creation Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Create a New Note</CardTitle>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        Capture your ideas, tasks, or code snippets instantly.
                    </p>
                </CardHeader>
                <CardContent>
                    <NoteForm onAdd={addNote} />
                </CardContent>
            </Card>

            {/* Notes Dashboard List Card */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>My Notes Board</CardTitle>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                Click on any card to edit content inline.
                                Auto-saves as you type.
                            </p>
                        </div>
                        {notes.length > 0 && (
                            <span className="text-xs font-bold bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-full shrink-0">
                                {notes.length}{" "}
                                {notes.length === 1 ? "Note" : "Notes"}
                            </span>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <NotesList
                        notes={notes}
                        isInitialized={isInitialized}
                        onUpdate={updateNote}
                        onDelete={deleteNote}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
