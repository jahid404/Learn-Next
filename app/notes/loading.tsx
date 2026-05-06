import React from "react";

export default function NotesLoading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse w-full max-w-lg mx-auto mt-10">
      <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-48" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-[180px] bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-full" />
        ))}
      </div>
    </div>
  );
}
