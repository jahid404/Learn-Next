"use client";

import React, { useState } from "react";
import { Note, NoteColor } from "../types";
import { Button } from "@/components/ui/button";

interface NoteCardProps {
  note: Note;
  onUpdate: (id: string, updates: Partial<Pick<Note, "title" | "content" | "color">>) => void;
  onDelete: (id: string) => void;
}

const COLOR_CLASSES: Record<NoteColor, string> = {
  rose: "bg-rose-50/80 dark:bg-rose-950/10 border-rose-100 dark:border-rose-900/30 text-rose-900 dark:text-rose-200",
  lavender: "bg-violet-50/80 dark:bg-violet-950/10 border-violet-100 dark:border-violet-900/30 text-violet-900 dark:text-violet-200",
  mint: "bg-emerald-50/80 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-200",
  honey: "bg-amber-50/80 dark:bg-amber-950/10 border-amber-100 dark:border-amber-900/30 text-amber-900 dark:text-amber-200",
  ocean: "bg-sky-50/80 dark:bg-sky-950/10 border-sky-100 dark:border-sky-900/30 text-sky-900 dark:text-sky-200",
  slate: "bg-zinc-50/80 dark:bg-zinc-900/20 border-zinc-200/50 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-200",
};

const DOT_COLORS: Record<NoteColor, string> = {
  rose: "bg-rose-400",
  lavender: "bg-violet-400",
  mint: "bg-emerald-400",
  honey: "bg-amber-400",
  ocean: "bg-sky-400",
  slate: "bg-zinc-400",
};

export function NoteCard({ note, onUpdate, onDelete }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  const handleSave = () => {
    if (editTitle.trim() !== note.title || editContent.trim() !== note.content) {
      onUpdate(note.id, {
        title: editTitle.trim() || "Untitled Note",
        content: editContent.trim() || "",
      });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSave();
    }
    if (e.key === "Escape") {
      setEditTitle(note.title);
      setEditContent(note.content);
      setIsEditing(false);
    }
  };

  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`group flex flex-col justify-between p-5 border rounded-2xl transition-all duration-300 hover:shadow-md/5 hover:scale-[1.01] min-h-[180px] ${
        COLOR_CLASSES[note.color]
      }`}
    >
      {isEditing ? (
        <div className="flex flex-col gap-2 flex-1">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Title"
            className="w-full font-bold text-sm bg-white/40 dark:bg-black/20 border border-zinc-200/40 rounded-lg p-1.5 focus:outline-none focus:border-zinc-400 transition-all text-zinc-900 dark:text-white"
            autoFocus
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Note content..."
            rows={4}
            className="w-full text-xs bg-white/40 dark:bg-black/20 border border-zinc-200/40 rounded-lg p-1.5 focus:outline-none focus:border-zinc-400 transition-all text-zinc-800 dark:text-zinc-200 resize-none flex-1"
          />
          <div className="flex gap-1.5 justify-end mt-1.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setEditTitle(note.title);
                setEditContent(note.content);
                setIsEditing(false);
              }}
              className="py-1 px-2.5 text-[11px] rounded-lg cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="success"
              size="sm"
              onClick={handleSave}
              className="py-1 px-2.5 text-[11px] rounded-lg cursor-pointer"
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 flex-1 cursor-pointer" onClick={() => setIsEditing(true)}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${DOT_COLORS[note.color]}`} />
              <h4 className="font-bold text-sm tracking-tight line-clamp-1">
                {note.title}
              </h4>
            </div>
          </div>
          <p className="text-xs leading-5 break-words line-clamp-4 flex-1 opacity-90">
            {note.content}
          </p>
        </div>
      )}

      {!isEditing && (
        <div className="flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-3 mt-4">
          <span className="text-[10px] font-semibold opacity-60">
            {formatDate(note.updatedAt)}
          </span>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(note.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg py-1 px-2.5 text-[10px] h-7 cursor-pointer"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
