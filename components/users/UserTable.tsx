import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Edit, Search, Trash2 } from 'lucide-react'
import { Input } from '../ui/input'
import { UserT } from '@/types'
import { Skeleton } from '../ui/skeleton'
import TableSkeleton from '../shared/TableSkeleton'

export default function UserTable({
    loading,
    filteredUsers,
    handleEditUser,
    handleDeleteUser,
    searchTerm,
    setSearchTerm
}: {
    filteredUsers: UserT[],
    handleEditUser: (user: UserT) => void,
    handleDeleteUser: (user: UserT) => void,
    searchTerm: string,
    setSearchTerm: (term: string) => void,
    loading: boolean,
}) {
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-red-100 text-red-800"
            case "moderator":
                return "bg-blue-100 text-blue-800"
            case "user":
                return "bg-green-100 text-green-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchTerm(localSearchTerm);
        }, 300) // Debounce time of 300ms
        return () => clearTimeout(delayDebounceFn)
    }, [localSearchTerm])

    return (
        <Card className=''>
            <CardHeader className='flex justify-between items-center'>
                <CardTitle className="flex items-center gap-2">
                    Users
                </CardTitle>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search users by name, email, or role..."
                        value={localSearchTerm}
                        onChange={(e) => setLocalSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? <TableSkeleton />
                            : filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge className={getRoleBadgeColor(user?.role_name ?? "")}>{user.role_name || "N/A"}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={user.is_active === 1 ? "success" : "secondary"}>
                                                {user.is_active === 1 ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDeleteUser(user)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
