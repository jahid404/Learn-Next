"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        // 1. Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "User already exists with this email" };
        }

        // 2. Hash the password (security best practice)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create user in database
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return { success: "Registration successful!", userId: newUser.id };
    } catch (error) {
        console.error("Registration Error:", error);
        return {
            error: `Something went wrong during registration. Error: ${error}`,
        };
    }
}
