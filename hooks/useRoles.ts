"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/axios/axios"
import type { Role } from "@/types"

export function useRoles() {
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")

    // Fetch roles
    const fetchRoles = async () => {
        setLoading(true)
        setError(null)
        api.get("/api/v1/roles", {
            params: {
                search: searchTerm || undefined,
            },
        })
            .then((response) => {
                console.log("Fetched roles:", response.data.data)
                setRoles(response.data.data)
            })
            .catch((err) => {
                setError("Failed to fetch roles")
                console.error("Error fetching roles:", err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    // Create role
    const createRole = async (data: { name: string; description: string; is_active: string }) => {
        try {
            const response = await api.post("/api/v1/roles", data)
            fetchRoles()
            return { success: true, data: response.data }
        } catch (err) {
            console.error("Error creating role:", err)
            return { success: false, error: "Failed to create role" }
        }
    }

    // Update role
    const updateRole = async (roleId: number, data: { name: string; description: string; is_active: string }) => {
        try {
            const response = await api.post(`/api/v1/roles/${roleId}`, {
                ...data,
                _method: "PUT",
            })
            // setRoles(roles.map((role) => (role.id === roleId ? response.data : role)))
            fetchRoles()
            return { success: true, data: response.data }
        } catch (err) {
            console.error("Error updating role:", err)
            return { success: false, error: "Failed to update role" }
        }
    }

    // Delete role
    const deleteRole = async (roleId: number) => {
        try {
            await api.delete(`/api/v1/roles/${roleId}`)
            // setRoles(roles.filter((role) => role.id !== roleId))
            fetchRoles()
            return { success: true }
        } catch (err) {
            console.error("Error deleting role:", err)
            return { success: false, error: "Failed to delete role" }
        }
    }

    useEffect(() => {
        fetchRoles()
    }, [searchTerm])

    return {
        roles,
        loading,
        error,
        fetchRoles,
        createRole,
        updateRole,
        deleteRole,
        setSearchTerm,
    }
}
