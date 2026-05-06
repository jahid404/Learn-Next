"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getNotes() {
  try {
    return await prisma.note.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return [];
  }
}

export async function addNoteAction(title: string, content: string, color: string) {
  try {
    const newNote = await prisma.note.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        color,
      },
    });
    revalidatePath("/notes");
    return { success: true, note: newNote };
  } catch (error) {
    console.error("Failed to create note:", error);
    return { error: `Failed to create note: ${error instanceof Error ? error.message : String(error)}` };
  }
}

export async function updateNoteAction(
  id: string,
  updates: { title?: string; content?: string; color?: string }
) {
  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        ...updates,
        updatedAt: new Date(),
      },
    });
    revalidatePath("/notes");
    return { success: true, note: updatedNote };
  } catch (error) {
    console.error("Failed to update note:", error);
    return { error: "Failed to update note" };
  }
}

export async function deleteNoteAction(id: string) {
  try {
    await prisma.note.delete({
      where: { id },
    });
    revalidatePath("/notes");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete note:", error);
    return { error: "Failed to delete note" };
  }
}
