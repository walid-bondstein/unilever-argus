"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Shield } from "lucide-react"
import type { Role } from "@/types"
import SidebarLayout from "@/components/ui/layouts/sidebarLayout"
import { useRoles } from "@/hooks/useRoles"
import { RoleForm } from "@/components/roles/RoleForm"
import { RoleTable } from "@/components/roles/RoleTable"

export default function RolesPage() {
    const { roles, loading, error, createRole, updateRole, deleteRole, setSearchTerm } = useRoles()
    const [localSearchTerm, setLocalSearchTerm] = useState("")
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [editingRole, setEditingRole] = useState<Role | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)


    const handleCreateRole = async (data: { name: string; description: string; is_active: string }) => {
        setIsSubmitting(true)
        const result = await createRole(data)
        setIsSubmitting(false)

        if (result.success) {
            setIsCreateDialogOpen(false)
        } else {
            // Handle error - could show toast notification
            alert(result.error)
        }
    }

    const handleEditRole = (role: Role) => {
        setEditingRole(role)
        setIsEditDialogOpen(true)
    }

    const handleUpdateRole = async (data: { name: string; description: string; is_active: string }) => {
        if (!editingRole) return

        setIsSubmitting(true)
        const result = await updateRole(editingRole.id, data)
        setIsSubmitting(false)

        if (result.success) {
            setIsEditDialogOpen(false)
            setEditingRole(null)
        } else {
            // Handle error - could show toast notification
            alert(result.error)
        }
    }

    const handleDeleteRole = async (roleId: number) => {
        const result = await deleteRole(roleId)

        if (!result.success) {
            // Handle error - could show toast notification
            alert(result.error)
        }
    }


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchTerm(localSearchTerm);
        }, 300) // Debounce time of 300ms
        return () => clearTimeout(delayDebounceFn)
    }, [localSearchTerm])

    if (error) {
        return (
            <SidebarLayout>
                <div className="flex-1 space-y-6 p-6">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-lg text-red-600">{error}</div>
                    </div>
                </div>
            </SidebarLayout>
        )
    }

    return (
        <SidebarLayout>
            <div className="flex-1 space-y-6 p-6">
                {/* Header */}
                <div className="flex justify-between items-center bg-white p-4 rounded-2xl border shadow-xs">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
                        <p className="text-muted-foreground">Manage system roles and permissions</p>
                    </div>
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Role
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Role</DialogTitle>
                            </DialogHeader>
                            <RoleForm
                                onSubmit={handleCreateRole}
                                onCancel={() => setIsCreateDialogOpen(false)}
                                isLoading={isSubmitting}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
                {/* Roles Table */}
                <Card>
                    <CardHeader className='flex justify-between items-center'>
                        <CardTitle className="flex items-center gap-2">
                            Roles
                        </CardTitle>
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search roles by name or description..."
                                value={localSearchTerm}
                                onChange={(e) => setLocalSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <RoleTable loading={loading} roles={roles} onEdit={handleEditRole} onDelete={handleDeleteRole} />
                    </CardContent>
                </Card>

                {/* Edit Role Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Role</DialogTitle>
                        </DialogHeader>
                        <RoleForm
                            role={editingRole}
                            onSubmit={handleUpdateRole}
                            onCancel={() => {
                                setIsEditDialogOpen(false)
                                setEditingRole(null)
                            }}
                            isLoading={isSubmitting}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </SidebarLayout>
    )
}
