"use client";

import { useState, useEffect } from "react";
import { Todo } from "../types";
import {
    getTodos,
    addTodoAction,
    toggleTodoAction,
    deleteTodoAction,
} from "../actions";

export function useTodoState() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    const addTodo = async (title: string) => {
        if (!title.trim()) return;

        // Optimistic Update: Add to UI immediately for lightning-fast feel
        const tempId = crypto.randomUUID();
        const tempTodo: Todo = {
            id: tempId,
            title: title.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
        };
        setTodos((prev) => [tempTodo, ...prev]);

        const result = await addTodoAction(title);
        if (result.error) {
            // Rollback if failed
            setTodos((prev) => prev.filter((t) => t.id !== tempId));
        } else if (result.todo) {
            // Replace temp todo with actual database todo
            setTodos((prev) =>
                prev.map((t) =>
                    t.id === tempId
                        ? {
                              id: result.todo.id,
                              title: result.todo.title,
                              completed: result.todo.completed,
                              createdAt:
                                  result.todo.createdAt instanceof Date
                                      ? result.todo.createdAt.toISOString()
                                      : String(result.todo.createdAt),
                          }
                        : t,
                ),
            );
        }
    };

    const toggleTodo = async (id: string) => {
        const originalTodo = todos.find((t) => t.id === id);
        if (!originalTodo) return;

        const newCompleted = !originalTodo.completed;

        // Optimistic Update
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: newCompleted } : todo,
            ),
        );

        const result = await toggleTodoAction(id, newCompleted);
        if (result.error) {
            // Rollback if failed
            setTodos((prev) =>
                prev.map((todo) =>
                    todo.id === id
                        ? { ...todo, completed: originalTodo.completed }
                        : todo,
                ),
            );
        }
    };

    const deleteTodo = async (id: string) => {
        const originalTodo = todos.find((t) => t.id === id);
        if (!originalTodo) return;

        // Optimistic Update
        setTodos((prev) => prev.filter((todo) => todo.id !== id));

        const result = await deleteTodoAction(id);
        if (result.error) {
            // Rollback if failed
            setTodos((prev) =>
                [...prev, originalTodo].sort((a, b) =>
                    b.createdAt.localeCompare(a.createdAt),
                ),
            );
        }
    };

    useEffect(() => {
        let isMounted = true;

        const loadTodos = async () => {
            try {
                const data = await getTodos();
                if (!isMounted) return;
                
                const formatted: Todo[] = data.map((todo) => ({
                    id: todo.id,
                    title: todo.title,
                    completed: todo.completed,
                    createdAt:
                        todo.createdAt instanceof Date
                            ? todo.createdAt.toISOString()
                            : String(todo.createdAt),
                }));
                setTodos(formatted);
            } catch (e) {
                console.error("Failed to load todos from database:", e);
            } finally {
                if (isMounted) {
                    setIsInitialized(true);
                }
            }
        };

        loadTodos();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        todos,
        isInitialized,
        addTodo,
        toggleTodo,
        deleteTodo,
    };
}
