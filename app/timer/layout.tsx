import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Next.js Timer Workspace | Learning Next.js",
    description:
        "A highly modularized Timer application built for learning Next.js.",
};

export default function TimerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black">
            {/* Workspace Header */}
            <header className="border-b border-zinc-200/50 bg-white dark:bg-zinc-950 dark:border-zinc-900 px-6 py-4">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-600">
                            Module 03
                        </span>
                        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                            Timer Workspace
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                            High-Precision Stopwatch
                        </span>
                    </div>
                </div>
            </header>

            {/* Main workspace container */}
            <main className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col gap-6">
                {children}
            </main>
        </div>
    );
}
