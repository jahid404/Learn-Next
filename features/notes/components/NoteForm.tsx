"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NoteColor } from "../types";

interface NoteFormProps {
  onAdd: (title: string, content: string, color: NoteColor) => void;
}

const COLORS: { val: NoteColor; label: string; class: string }[] = [
  { val: "slate", label: "Slate", class: "bg-zinc-400 dark:bg-zinc-600" },
  { val: "rose", label: "Rose", class: "bg-rose-400 dark:bg-rose-600" },
  { val: "lavender", label: "Lavender", class: "bg-violet-400 dark:bg-violet-600" },
  { val: "mint", label: "Mint", class: "bg-emerald-400 dark:bg-emerald-600" },
  { val: "honey", label: "Honey", class: "bg-amber-400 dark:bg-amber-600" },
  { val: "ocean", label: "Ocean", class: "bg-sky-400 dark:bg-sky-600" },
];

export function NoteForm({ onAdd }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState<NoteColor>("slate");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAdd(title, content, selectedColor);
    setTitle("");
    setContent("");
    setSelectedColor("slate");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Title"
        placeholder="Catchy note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={50}
        required
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Note Content
        </label>
        <textarea
          placeholder="Write down your thoughts or tasks here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          required
          className="w-full px-4 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:focus:bg-zinc-950 dark:focus:border-zinc-100 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-zinc-50 resize-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
        {/* Color picker */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Tag Color
          </span>
          <div className="flex gap-2">
            {COLORS.map((col) => (
              <button
                key={col.val}
                type="button"
                onClick={() => setSelectedColor(col.val)}
                title={col.label}
                className={`w-6 h-6 rounded-full cursor-pointer border transition-transform active:scale-90 ${col.class} ${
                  selectedColor === col.val
                    ? "border-zinc-900 dark:border-zinc-50 ring-2 ring-zinc-900/10 scale-110"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={!title.trim() || !content.trim()}
          className="self-end sm:self-auto px-6"
        >
          Add Note
        </Button>
      </div>
    </form>
  );
}
