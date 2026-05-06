"use client";

import React from "react";
import { Todo } from "../types";
import { Button } from "@/components/ui/button";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group flex items-center justify-between gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl transition-all duration-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 cursor-pointer rounded-md border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-zinc-100 transition-all"
        />
        <span
          className={`text-sm font-medium truncate transition-all duration-300 ${
            todo.completed
              ? "text-zinc-400 line-through decoration-zinc-300 dark:text-zinc-500"
              : "text-zinc-800 dark:text-zinc-200"
          }`}
        >
          {todo.title}
        </span>
      </div>
      <Button
        variant="danger"
        size="sm"
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg py-1 px-2.5 text-xs"
      >
        Delete
      </Button>
    </div>
  );
}
