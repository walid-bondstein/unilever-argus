import { Dialog } from '@radix-ui/react-dialog'
import React from 'react'
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function CreateUser({
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    formData,
    setFormData,
    handleCreateUser,
    roles
}: {
    isCreateDialogOpen: boolean
    setIsCreateDialogOpen: (open: boolean) => void,
    formData: {
        id: string,
        name: string,
        email: string,
        role_id: string,
        phone: string,
        address: string,
        password: string,
        is_active: string,
    },
    setFormData: (data: {
        id: string,
        name: string,
        email: string,
        role_id: string,
        phone: string,
        address: string,
        password: string,
        is_active: string,
    }) => void,
    handleCreateUser: () => void,
    roles: { id: number | string, name: string }[]
}) {
    return (
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create User
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter user name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter email address"
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Enter phone number"
                        />
                    </div>
                    <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            type="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Enter address"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Enter password"
                        />
                    </div>
                    <div>
                        <Label htmlFor="role">Role</Label>
                        <Select value={formData.role_id} onValueChange={(value) => setFormData({ ...formData, role_id: value })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    roles.map((role: { id: number | string, name: string }) => (
                                        <SelectItem key={role.id} value={role.id.toString()}>{role.name}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateUser}>Create User</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
