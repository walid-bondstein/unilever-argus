"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(id: string, name: string, token: string, role: { id: number | string, name: string }) {
    // Create session data
    const sessionData = {
        userId: id,
        name: name,
        loginTime: new Date().toISOString(),
        role: role,
        token: token,
    }

    console.log("Setting login cookie for user:", sessionData);
    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set(process.env.NEXT_ACCESS_TOKEN || "auth_session", JSON.stringify(sessionData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return { success: true }
}

export async function logoutAction() {
    const cookieStore = await cookies()
    cookieStore.delete(process.env.NEXT_ACCESS_TOKEN || "")
    redirect("/")
}

export async function verifySession() {
    const cookieStore = await cookies()
    const session = cookieStore.get(process.env.NEXT_ACCESS_TOKEN || "")

    if (!session?.value) {
        return null
    }

    try {
        const sessionData = JSON.parse(session.value)
        return sessionData
    } catch {
        return null
    }
}
