"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BasicsPage() {
    const handleBtnClick1 = () => {
        alert("Button 1 clicked");
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
                            <CardTitle>Next.js Basics</CardTitle>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                Starting simple, just a button
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    <Button variant="primary" onClick={handleBtnClick1}>
                        Click Me
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
