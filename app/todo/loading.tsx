import React from "react";

export default function TodoLoading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse w-full max-w-lg mx-auto mt-10">
      <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-48" />
      <div className="h-[200px] bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-full" />
    </div>
  );
}
