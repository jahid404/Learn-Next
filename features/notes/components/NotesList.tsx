"use client";

import React, { useState } from "react";
import { Note, NoteColor } from "../types";
import { NoteCard } from "./NoteCard";
import { Input } from "@/components/ui/input";

interface NotesListProps {
  notes: Note[];
  isInitialized: boolean;
  onUpdate: (id: string, updates: Partial<Pick<Note, "title" | "content" | "color">>) => void;
  onDelete: (id: string) => void;
}

const FILTER_PILLS: { val: "all" | NoteColor; label: string; class: string }[] = [
  { val: "all", label: "All Notes", class: "bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200" },
  { val: "rose", label: "Rose", class: "bg-rose-50 hover:bg-rose-100 text-rose-800 dark:bg-rose-950/20 dark:text-rose-200" },
  { val: "lavender", label: "Lavender", class: "bg-violet-50 hover:bg-violet-100 text-violet-800 dark:bg-violet-950/20 dark:text-violet-200" },
  { val: "mint", label: "Mint", class: "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-200" },
  { val: "honey", label: "Honey", class: "bg-amber-50 hover:bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-200" },
  { val: "ocean", label: "Ocean", class: "bg-sky-50 hover:bg-sky-100 text-sky-800 dark:bg-sky-950/20 dark:text-sky-200" },
];

export function NotesList({
  notes,
  isInitialized,
  onUpdate,
  onDelete,
}: NotesListProps) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | NoteColor>("all");

  // Derive filtered notes in real-time
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "all" || note.color === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (!isInitialized) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="h-[180px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Search and Filters */}
      <div className="flex flex-col gap-3">
        <Input
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="py-2"
        />

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FILTER_PILLS.map((pill) => (
            <button
              key={pill.val}
              type="button"
              onClick={() => setActiveFilter(pill.val)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-all border shrink-0 ${
                pill.class
              } ${
                activeFilter === pill.val
                  ? "border-zinc-900 dark:border-zinc-50 ring-1 ring-zinc-900/10 dark:ring-white/10 scale-[1.03]"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid rendering */}
      {filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center mt-2">
          <span className="text-3xl mb-2">📝</span>
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            No notes found
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {search || activeFilter !== "all"
              ? "Try adjusting your search query or color filters."
              : "Create your very first note using the form above."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
