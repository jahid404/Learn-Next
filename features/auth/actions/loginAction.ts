"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/auth";

export async function loginUser(
    formData: FormData,
    returnTokenOnly: boolean = false,
) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        // 1. Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { error: "Invalid email or password" };
        }

        // 2. Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { error: "Invalid email or password" };
        }

        // 3. Create session token expires in 2 hours
        const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
        const session = await encrypt({
            userId: user.id,
            email: user.email,
            name: user.name,
            expires,
        });

        // 4. Respond conditionally based on strategy
        if (returnTokenOnly) {
            return { success: true, token: session };
        }

        // For Cookie/Session Flow: Set HTTP-only cookie
        const cookieStore = await cookies();
        cookieStore.set("session", session, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return { success: true };
    } catch (error) {
        console.error("Login Error:", error);
        return {
            error: "Something went wrong during login process.",
        };
    }
}

export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    return { success: true };
}
