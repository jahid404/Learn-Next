"use client";

import { useState, useEffect } from "react";
import { Todo } from "../types";

export function useTodoState() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load todos from localStorage on initial render
  useEffect(() => {
    try {
      const saved = localStorage.getItem("learn-next-todos");
      if (saved) {
        setTodos(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to parse todos from localStorage:", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("learn-next-todos", JSON.stringify(todos));
    }
  }, [todos, isInitialized]);

  const addTodo = (title: string) => {
    if (!title.trim()) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    isInitialized,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
