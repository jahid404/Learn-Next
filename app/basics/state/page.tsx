"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BasicsPage() {
    const [name, setName] = useState("World!");

    const handleBtnClick = () => {
        if (name == "World!") {
            setName("Next.js!");
        } else {
            setName("World!");
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
                            <CardTitle>Basics State</CardTitle>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                Starting simple, just a button with state
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    <h1 className="text-5xl font-semibold dark:text-white text-black">
                        Hello {name}
                    </h1>
                    <Button variant="primary" onClick={handleBtnClick}>
                        Click Me to change state
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
