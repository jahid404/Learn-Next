"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { registerUser } from "@/features/auth/actions/registerAction";
import { useRouter } from "next/navigation";

export function RegisterForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState<{ type: "error" | "success", message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setFeedback(null);

        // FormData creates a structured dataset that our server action expects
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        const result = await registerUser(formData);

        setIsLoading(false);

        if (result.error) {
            setFeedback({ type: "error", message: result.error });
        } else {
            setFeedback({ type: "success", message: "Registration successful! Redirecting..." });
            // Wait a moment then send user to login
            setTimeout(() => {
                router.push("/auth/login");
            }, 1500);
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
                    label="Name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    required
                />
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
                    {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
            </form>
            <div className="flex justify-center items-center mt-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="text-zinc-900 dark:text-zinc-50"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </>
    );
}
