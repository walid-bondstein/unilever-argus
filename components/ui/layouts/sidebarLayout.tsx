"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { RouteGuard } from "../auth/route-guard"

export default function SidebarLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    return (
        <RouteGuard>
            <div className="h-screen flex bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-hidden">{children}</main>
                </div>
            </div>
        </RouteGuard>
    )
}
