"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login with:", { email, password });
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4"
            >
                <Input
                    label="Email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" className="w-full mt-2">
                    Sign In
                </Button>
            </form>
            <div className="flex justify-center items-center mt-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/auth/register"
                        className="text-zinc-900 dark:text-zinc-50"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </>
    );
}
