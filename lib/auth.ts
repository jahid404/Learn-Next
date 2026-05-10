import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(
    process.env.JWT_SECRET || "antigravity_super_secret_key_change_me"
);

export interface SessionPayload extends JWTPayload {
    userId: string;
    email: string;
    name?: string | null;
    expires: Date | string;
}

export async function encrypt(payload: SessionPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(SECRET_KEY);
}

export async function decrypt(input: string): Promise<SessionPayload> {
    const { payload } = await jwtVerify(input, SECRET_KEY, {
        algorithms: ["HS256"],
    });
    return payload as SessionPayload;
}

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return null;
    try {
        return await decrypt(session);
    } catch {
        return null;
    }
}
