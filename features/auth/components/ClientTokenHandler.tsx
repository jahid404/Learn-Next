"use client";

import React, { useEffect, useState } from "react";
import { verifyTokenAction } from "../actions/verifyToken";
import { SessionPayload } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ClientTokenHandler() {
    const [clientUser, setClientUser] = useState<SessionPayload | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Fallback: Check if there's a raw JWT in local storage
        const storedToken = localStorage.getItem("app_jwt_token");

        if (!storedToken) {
            // No token -> just send user away immediately, no need to flip loading state!
            router.push("/auth/login");
            return;
        }

        // Validate token mathematically on the backend
        async function validate() {
            const result = await verifyTokenAction(storedToken!);

            if (result.success && result.payload) {
                setClientUser(result.payload);
                setLoading(false);
            } else {
                localStorage.removeItem("app_jwt_token");
                router.push("/auth/login");
            }
        }

        validate();
    }, [router]);

    if (loading) {
        return (
            <div className="flex flex-col items-center gap-2 p-4">
                <div className="animate-pulse bg-zinc-200 dark:bg-zinc-800 h-8 w-48 rounded-md"></div>
                <div className="animate-pulse bg-zinc-200 dark:bg-zinc-800 h-4 w-32 rounded-md"></div>
            </div>
        );
    }

    if (!clientUser) return null;

    const handleLogout = () => {
        localStorage.removeItem("app_jwt_token");
        router.push("/auth/login");
    };

    return (
        <div className="flex flex-col items-center">
            <div className="mx-auto bg-sky-100 dark:bg-sky-900/30 h-16 w-16 rounded-full flex items-center justify-center mb-4 text-2xl">
                🔗
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 text-center">
                Welcome, {clientUser.name || "JWT User"}!
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
                {clientUser.email}
            </p>
            <div className="bg-sky-50 dark:bg-sky-900/30 w-full rounded-xl p-4 border border-sky-100 dark:border-sky-800 text-sm text-sky-700 dark:text-sky-300 mb-6">
                <p className="font-medium mb-1">⚡ Stateless JWT Auth Mode</p>
                <p className="text-xs">
                    Identity resolved from <b>localStorage</b> + manual
                    verification.
                </p>
            </div>
            <Button onClick={handleLogout} variant="danger" className="w-full">
                Log Out (Clear JWT)
            </Button>
        </div>
    );
}
