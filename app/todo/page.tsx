"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TodoForm } from "@/features/todos/components/TodoForm";
import { TodoList } from "@/features/todos/components/TodoList";
import { useTodoState } from "@/features/todos/hooks/useTodoState";
import Link from "next/link";

export default function TodoPage() {
    const { todos, isInitialized, addTodo, toggleTodo, deleteTodo } =
        useTodoState();

    // Statistics
    const totalTasks = todos.length;
    const completedTasks = todos.filter((t) => t.completed).length;
    const completionRate =
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="flex flex-col gap-6 max-w-lg w-full mx-auto mt-6">
            {/* Navigation back to Home */}
            <Link
                href="/"
                className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors w-fit flex items-center gap-1.5"
            >
                ← Back to Learning Home
            </Link>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>My Tasks</CardTitle>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                Manage your daily objectives and milestones.
                            </p>
                        </div>
                        {totalTasks > 0 && (
                            <span className="text-xs font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 px-2.5 py-1 rounded-full">
                                {completedTasks}/{totalTasks} Done (
                                {completionRate}%)
                            </span>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <TodoForm onAdd={addTodo} />
                    <hr className="border-zinc-100 dark:border-zinc-800" />
                    <TodoList
                        todos={todos}
                        isInitialized={isInitialized}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
