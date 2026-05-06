import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Next.js To-Do Application | Learning Next.js",
    description:
        "A highly modularized To-Do application built to learn Next.js App Router.",
};

export default function TodoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black">
            {/* Feature header */}
            <header className="border-b border-zinc-200/50 bg-white dark:bg-zinc-950 dark:border-zinc-900 px-6 py-4">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-600">
                            Module 01
                        </span>
                        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                            To-Do Workspace
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                            Active Environment
                        </span>
                    </div>
                </div>
            </header>

            {/* Main feature content */}
            <main className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col gap-6">
                {children}
            </main>
        </div>
    );
}
