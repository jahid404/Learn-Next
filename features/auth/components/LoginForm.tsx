"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginUser } from "@/features/auth/actions/loginAction";
import { useRouter } from "next/navigation";

export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState<{
        type: "error" | "success";
        message: string;
    } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setFeedback(null);

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const result = await loginUser(formData);

        setIsLoading(false);

        if (result.error) {
            setFeedback({ type: "error", message: result.error });
        } else {
            setFeedback({ type: "success", message: "Successfully logged in! Redirecting..." });
            router.push("/dashboard");
            router.refresh(); // Forces the layout/server components to re-run to detect cookie
        }
    };

    return (
        <>
            {feedback && (
                <div className={`w-full p-3 rounded-xl text-sm font-medium mb-2 ${
                    feedback.type === 'error' 
                        ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800' 
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800'
                }`}>
                    {feedback.message}
                </div>
            )}
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
                    disabled={isLoading}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                />
                <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
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
