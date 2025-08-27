"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/axios/axios"

interface Profile {
    id: number
    name: string
    email: string
    phone: string
    address: string
    image: string | null
    email_verified_at: string | null
    role_id: number
    company_id: number | null
    created_at: string
    updated_at: string
    is_active: number
    created_by: number | null
    updated_by: number | null
}

export function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProfile = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.get("/api/v1/profile/show")
            setProfile(response.data.data)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch profile")
            console.error("Error fetching profile:", err)
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async (updatedData: Partial<Profile>) => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.post("/api/v1/profile/update", updatedData)
            setProfile(response.data.data)
            return response.data.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update profile")
            console.error("Error updating profile:", err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    return {
        profile,
        loading,
        error,
        fetchProfile,
        updateProfile,
    }
}
