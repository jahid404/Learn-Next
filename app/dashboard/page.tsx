import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/features/auth/actions/loginAction";
import Link from "next/link";

import { ClientTokenHandler } from "@/features/auth/components/ClientTokenHandler";

export default async function DashboardPage() {
    const session = await getSession();

    const handleLogout = async () => {
        "use server";
        await logoutUser();
        redirect("/auth/login");
    };

    return (
        <main className="min-h-[80vh] flex flex-col items-center justify-center p-6">
            <Card className="max-w-md w-full">
                {session ? (
                    // --- SERVER-SIDE RENDERED VIEW (Cookie Driven) ---
                    <>
                        <CardHeader className="text-center">
                            <div className="mx-auto bg-emerald-100 dark:bg-emerald-900/30 h-16 w-16 rounded-full flex items-center justify-center mb-4 text-2xl">
                                👋
                            </div>
                            <CardTitle className="text-2xl">
                                Welcome, {session.name || "User"}!
                            </CardTitle>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                                {session.email}
                            </p>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-300">
                                <p className="font-medium mb-1">
                                    🔐 You are currently logged in.
                                </p>
                                <p>
                                    A secure, HTTP-only cookie session has been
                                    established in your browser.
                                </p>
                            </div>

                            <form action={handleLogout}>
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    className="w-full"
                                >
                                    Log Out
                                </Button>
                            </form>
                        </CardContent>
                    </>
                ) : (
                    // --- CLIENT-SIDE RESOLVER VIEW (JWT Flow Fallback) ---
                    <CardContent className="pt-6">
                        <ClientTokenHandler />
                    </CardContent>
                )}
                
                <div className="flex justify-center mb-6">
                     <Link
                        href="/"
                        className="text-xs text-center text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                        ← Go to Learning Portal
                    </Link>
                </div>
            </Card>
        </main>
    );
}
