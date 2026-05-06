"use client";

import React from "react";
import { Todo } from "../types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  isInitialized: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({
  todos,
  isInitialized,
  onToggle,
  onDelete,
}: TodoListProps) {
  if (!isInitialized) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-[58px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center">
        <span className="text-2xl mb-2">✨</span>
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          All caught up!
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Add some tasks above to begin your journey.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
