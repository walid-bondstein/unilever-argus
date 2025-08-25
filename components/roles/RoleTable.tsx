"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2 } from "lucide-react"
import type { Role } from "@/types"
import TableSkeleton from "../shared/TableSkeleton"

interface RoleTableProps {
    roles: Role[]
    onEdit: (role: Role) => void
    onDelete: (roleId: number) => void
    loading?: boolean
}

export function RoleTable({ roles, onEdit, onDelete, loading }: RoleTableProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? <TableSkeleton /> : roles.map((role) => (
                    <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{role.description || "No description"}</TableCell>
                        <TableCell>
                            <Badge variant={role.is_active === 1 ? "default" : "secondary"}>
                                {role.is_active === 1 ? "Active" : "Inactive"}
                            </Badge>
                        </TableCell>
                        <TableCell>{formatDate(role.created_at)}</TableCell>
                        <TableCell>{role.updated_by ? role.updated_by?.name : "System"}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm" onClick={() => onEdit(role)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            className="text-red-600 hover:text-red-700"
                                            variant="outline" size="sm"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Role</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete the role &quot;{role.name}&quot;? This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => onDelete(role.id)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
