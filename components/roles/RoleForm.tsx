"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Role } from "@/types"

interface RoleFormProps {
    role?: Role | null
    onSubmit: (data: { name: string; description: string; is_active: string }) => void
    onCancel: () => void
    isLoading?: boolean
}

export function RoleForm({ role, onSubmit, onCancel, isLoading = false }: RoleFormProps) {
    const [formData, setFormData] = useState({
        name: role?.name || "",
        description: role?.description || "",
        is_active: role?.is_active?.toString() || "1",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Role Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter role name"
                    required
                />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter role description"
                />
            </div>
            <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.is_active} onValueChange={(value) => setFormData({ ...formData, is_active: value })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Active</SelectItem>
                        <SelectItem value="0">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : role ? "Update Role" : "Create Role"}
                </Button>
            </div>
        </form>
    )
}
