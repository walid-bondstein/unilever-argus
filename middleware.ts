import { NextRequest, NextResponse } from "next/server";
import { REDIRECT_URLS } from "./data/redirectData";
import sidebarData from "@/data/sidebarData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const routes: any[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
sidebarData.forEach((ech: any) => {
    if (ech.hasSubmenu) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return ech.subItemList.forEach((sEch: any) => {
            if (!sEch.open) routes.push(sEch)
        });
    } else if (!ech.open) routes.push(ech);
});



export function middleware(request: NextRequest) {
    // Get the session cookie
    const session = request.cookies.get(process.env.NEXT_ACCESS_TOKEN || "auth_session")
    const { pathname } = request.nextUrl
    // Check if the current route is protected
    const isProtectedRoute = routes.some((each) => pathname === each.route);
    const access = routes.find((each) => each.route === pathname);
    // If accessing a protected route without a session, redirect to login
    // console.log({ session, isProtectedRoute, pathname })
    if (isProtectedRoute && !session) {
        const loginUrl = new URL("/", request.url)
        return NextResponse.redirect(loginUrl)
    }

    if (access && !access.for) {
        return NextResponse.next()
    }
    if (access && access.for) {
        const { name } = JSON.parse(session?.value ?? "").role ?? { name: '' };
        if (!access.for.includes(name)) return NextResponse.redirect(new URL("/404", request.url));
    }

    // If logged in and trying to access login page, redirect to dashboard
    if (session && pathname === "/") {
        const userRole = String(JSON.parse(session?.value ?? "")?.roleWeight) ?? '';
        const dashboardUrl = new URL(REDIRECT_URLS[userRole] ?? "/dashboard", request.url);
        return NextResponse.redirect(dashboardUrl)
    }

    // Allow the request to continue
    return NextResponse.next()
}

export const config = {
    matcher: ['/:path*'],
};