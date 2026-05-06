"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  try {
    return await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return [];
  }
}

export async function addTodoAction(title: string) {
  if (!title.trim()) return { error: "Title is required" };

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title: title.trim(),
        completed: false,
      },
    });
    revalidatePath("/todo");
    return { success: true, todo: newTodo };
  } catch (error) {
    console.error("Failed to create todo:", error);
    return { error: "Failed to create todo" };
  }
}

export async function toggleTodoAction(id: string, completed: boolean) {
  try {
    await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    revalidatePath("/todo");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle todo:", error);
    return { error: "Failed to toggle todo" };
  }
}

export async function deleteTodoAction(id: string) {
  try {
    await prisma.todo.delete({
      where: { id },
    });
    revalidatePath("/todo");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete todo:", error);
    return { error: "Failed to delete todo" };
  }
}
