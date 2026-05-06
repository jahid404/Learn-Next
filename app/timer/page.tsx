"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TimerPage() {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive) {
            interval = setInterval(() => {
                setTime((prev) => prev + 10);
            }, 10);
        }

        // Cleanup: critical for clearing the high-frequency interval when paused or unmounted
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isActive]);

    const toggle = () => {
        setIsActive(!isActive);
    };

    const reset = () => {
        setTime(0);
        setIsActive(false);
    };

    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time / 10) % 100);

    return (
        <div className="flex flex-col gap-6 max-w-lg w-full mx-auto mt-6 px-4">
            {/* Navigation back to Learning Home */}
            <Link
                href="/"
                className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors w-fit flex items-center gap-1.5"
            >
                ← Back to Learning Home
            </Link>

            <Card className="border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden backdrop-blur-md">
                <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800/80">
                    <div>
                        <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                            Stopwatch Demo
                        </CardTitle>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            An elegant demonstration of React&apos;s useEffect
                            hook.
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-8 py-8">
                    {/* Modern, segmented visual blocks with clear labels */}
                    <div className="flex gap-4 justify-center items-center py-4 px-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 w-full max-w-sm border border-zinc-100 dark:border-zinc-800 shadow-sm">
                        {/* Minutes Segment */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800 shadow-sm">
                                <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                                    {minutes.toString().padStart(2, "0")}
                                </span>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-2">
                                Min
                            </span>
                        </div>

                        <span className="text-3xl font-bold text-zinc-300 dark:text-zinc-700 -mt-6">
                            :
                        </span>

                        {/* Seconds Segment */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800 shadow-sm">
                                <span
                                    className={`text-3xl sm:text-4xl font-mono font-bold tracking-tight transition-colors duration-500 ${
                                        isActive
                                            ? "text-emerald-500 dark:text-emerald-400"
                                            : "text-zinc-800 dark:text-zinc-100"
                                    }`}
                                >
                                    {seconds.toString().padStart(2, "0")}
                                </span>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-2">
                                Sec
                            </span>
                        </div>

                        <span className="text-3xl font-bold text-zinc-300 dark:text-zinc-700 -mt-6">
                            :
                        </span>

                        {/* Milliseconds Segment */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800 shadow-sm">
                                <span
                                    className={`text-3xl sm:text-4xl font-mono font-bold tracking-tight transition-colors duration-500 ${
                                        isActive
                                            ? "text-amber-500 dark:text-amber-400"
                                            : "text-zinc-500 dark:text-zinc-400"
                                    }`}
                                >
                                    {milliseconds.toString().padStart(2, "0")}
                                </span>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-2">
                                Ms
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            variant={isActive ? "secondary" : "primary"}
                            onClick={toggle}
                            className="w-28 transition-transform active:scale-95 shadow-sm font-semibold"
                        >
                            {isActive ? "Pause" : "Start"}
                        </Button>
                        <Button
                            variant="danger"
                            onClick={reset}
                            disabled={time === 0}
                            className="w-28 transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-sm font-semibold"
                        >
                            Reset
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
