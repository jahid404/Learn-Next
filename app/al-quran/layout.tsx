import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Next.js Al Quran | Learning Next.js",
    description:
        "A highly modularized Al Quran application built to learn Next.js App Router.",
};

export default function AlQuranLayout({
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
                            Module 07
                        </span>
                        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                            Al Quran Workspace
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                            Active Environment
                        </span>
                    </div>
                </div>
            </header>

            {/* Main feature content */}
            <main className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col gap-6">
                {/* Navigation back to Home */}
                <div className="flex justify-between w-full">
                    <Link
                        href="/al-quran"
                        className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors w-fit flex items-center gap-1.5"
                    >
                        ← Back to Al Quran List
                    </Link>
                    <Link
                        href="/"
                        className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors w-fit flex items-center gap-1.5"
                    >
                        Learning Home →
                    </Link>
                </div>

                {children}
            </main>
        </div>
    );
}
