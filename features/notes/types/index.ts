export type NoteColor = "rose" | "lavender" | "mint" | "honey" | "ocean" | "slate";

export interface Note {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  createdAt: string;
  updatedAt: string;
}
