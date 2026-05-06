"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TodoPage() {
    const [count, setCount] = React.useState(0);

    const increment = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const decrement = () => {
        setCount((prevCount) => prevCount - 1);
    };

    const getCounterColor = (val: number) => {
        if (val === 0) return "currentColor";

        const maxVal = 10;
        const intensity = Math.min(Math.abs(val), maxVal) / maxVal;

        if (val > 0) {
            // Positive values
            const hue = 80 + intensity * 60;
            const saturation = 65 + intensity * 20;
            const lightness = 55 - intensity * 15;
            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        } else {
            // Negative values
            const hue = 40 - intensity * 40;
            const saturation = 70 + intensity * 20;
            const lightness = 60 - intensity * 15;
            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-lg w-full mx-auto mt-6">
            {/* Navigation back to Home */}
            <Link
                href="/"
                className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors w-fit flex items-center gap-1.5"
            >
                ← Back to Learning Home
            </Link>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>My Counter</CardTitle>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                Count your daily score.
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    <div className="flex flex-col justify-center items-center">
                        <h1
                            className="text-5xl font-bold transition-all duration-300 ease-in-out select-none"
                            style={{ color: getCounterColor(count) }}
                        >
                            {count}
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                            Score
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="danger" onClick={decrement}>
                            Decrement
                            <span className="ml-2">-</span>
                        </Button>
                        <Button variant="primary" onClick={increment}>
                            Increment
                            <span className="ml-2">+</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
