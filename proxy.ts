import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

// 1. Define which routes are Protected and which are Auth-only
const protectedRoutes = ["/dashboard"];
const authRoutes = ["/auth/login", "/auth/register"];

export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // 2. Check if the current path is a protected or auth route
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isAuthRoute = authRoutes.some(route => path.startsWith(route));

    // 3. Attempt to retrieve and decrypt the session cookie
    const cookie = request.cookies.get("session")?.value;
    let session = null;

    if (cookie) {
        try {
            session = await decrypt(cookie);
        } catch (e) {
            // Invalid or expired token, clear it logically
            session = null;
        }
    }

    // 4. Redirect Logic
    // Condition A: User tries to access a Protected Route but has NO valid session -> Boot to Login
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }

    // Condition B: User tries to access Login/Register but ALREADY HAS an active session -> Boot to Dashboard
    if (isAuthRoute && session) {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }

    // Condition C: Everything is fine, proceed as normal
    return NextResponse.next();
}

// 5. Configure the Matcher (tells Next.js exactly which routes run this code)
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
