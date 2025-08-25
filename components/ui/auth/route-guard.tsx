"use client"

import type React from "react"

import { useAppSelector, type RootState } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface RouteGuardProps {
  children: React.ReactNode
}

export function RouteGuard({ children }: RouteGuardProps) {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#7584C7]"></div>
      </div>
    )
  }

  return <>{children}</>
}
