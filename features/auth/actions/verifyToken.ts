"use server";

import { decrypt } from "@/lib/auth";

export async function verifyTokenAction(token: string) {
    try {
        const payload = await decrypt(token);
        return { success: true, payload };
    } catch (e) {
        return { success: false };
    }
}
