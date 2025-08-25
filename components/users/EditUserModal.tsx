import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'

export default function EditUserModal({
    isEditDialogOpen,
    setIsEditDialogOpen,
    formData,
    setFormData,
    handleUpdateUser,
    roles
}: {
    isEditDialogOpen: boolean
    setIsEditDialogOpen: (open: boolean) => void,
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
    handleUpdateUser: (id: string) => void,
    roles: { id: number | string, name: string }[]
}) {
    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className='space-y-2'>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter user name"
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter email address"
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Enter phone number"
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            type="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Enter address"
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Enter password"
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
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
                        <div className='space-y-2'>
                            <Label htmlFor="is_active">Active</Label>
                            <Select value={formData.is_active} onValueChange={(value) => setFormData({ ...formData, is_active: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Activity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"1"}>Active</SelectItem>
                                    <SelectItem value={"0"}>inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => handleUpdateUser(formData.id)}>Update User</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
