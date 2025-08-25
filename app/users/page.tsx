"use client"

import Paginate from "@/components/shared/Pagination"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import SidebarLayout from "@/components/ui/layouts/sidebarLayout"
import CreateUser from "@/components/users/CreateUser"
import EditUserModal from "@/components/users/EditUserModal"
import UserTable from "@/components/users/UserTable"
import { api } from "@/lib/axios/axios"
import { UserT } from "@/types"
import { useEffect, useState } from "react"
import { toast } from "sonner"



export default function UsersPage() {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<UserT | null>(null);
    const [users, setUsers] = useState<UserT[]>([])
    const [roles, setRoles] = useState<{ id: number | string, name: string }[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [dataMark, setDataMark] = useState({
        perPage: 0,
        totalItem: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const [loading, setLoading] = useState<{
        [key: string]: boolean
    }>({
        fetchUsers: false,
    })
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        role_id: "",
        phone: "",
        address: "",
        password: "",
        is_active: "",
    })

    // Handle create user
    const handleCreateUser = () => {
        if (!formData.name || !formData.email || !formData.role_id) return
        setLoading((prev) => ({ ...prev, createUser: true }))
        const copy: {
            id?: string,
            name: string,
            email: string,
            role_id: string,
            phone: string,
            address: string,
            password: string,
            is_active?: string,
        } = { ...formData }
        delete copy.id;
        delete copy.is_active;
        api.post('/api/v1/users', {
            ...copy
        })
            .then(() => {
                fetchData()
                setIsCreateDialogOpen(false)
                resetForm()
            })
            .catch(error => {
                toast.error(error.response?.data?.message);
            })
            .finally(() => {
                // Always executed
                setLoading((prev) => ({ ...prev, createUser: false }))
            });
    }

    // Handle edit user
    const handleEditUser = (user: UserT) => {
        setFormData({
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role_id: user.role_id.toString(),
            phone: user.phone,
            address: user.address,
            password: "",
            is_active: user.is_active.toString(),
        })
        setIsEditDialogOpen(true)
    }

    // Handle update user
    const handleUpdateUser = () => {
        if (!formData.name || !formData.email || !formData.role_id) return
        setLoading((prev) => ({ ...prev, createUser: true }));
        const copy: {
            id?: string,
            name: string,
            email: string,
            role_id: string,
            phone: string,
            address: string,
            password: string,
            is_active?: string,
        } = { ...formData }
        delete copy.id;
        api.post(`/api/v1/roles/${1}`, {
            ...copy,
            _method: 'PUT'
        })
            .then(() => {
                fetchData()
                setIsEditDialogOpen(false)
                resetForm()
            })
            .catch(error => {
                toast.error(error.response?.data?.message);
            })
            .finally(() => {
                // Always executed
                setLoading((prev) => ({ ...prev, createUser: false }))
            });
    }

    // Handle delete user
    // Open confirmation dialog
    const openDeleteDialog = (user: UserT) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    // Confirm delete
    const handleDeleteUser = () => {
        if (!userToDelete) return toast.error("No user selected for deletion.");
        setLoading((prev) => ({ ...prev, deleteUser: true }))
        api.delete(`/api/v1/users/${userToDelete?.id}`)
            .then(() => {
                toast.success("User deleted successfully");
                fetchData();
                setUserToDelete(null);
                setDeleteDialogOpen(false);
            })
            .catch((error) => {
                toast.error(error.response?.data?.message);
            })
            .finally(() => {
                // Always executed
                setLoading((prev) => ({ ...prev, deleteUser: false }))
            });
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            id: "",
            name: "",
            email: "",
            role_id: "",
            phone: "",
            address: "",
            password: "",
            is_active: "",
        })
    };


    function fetchData() {
        setLoading((prev) => ({ ...prev, fetchUsers: true }))
        api.get('/api/v1/users', {
            params: {
                search: searchTerm || undefined,
                currentPage: currentPage || undefined,
            }
        })
            .then(response => {
                setUsers(response.data.data.data);
                setDataMark({
                    perPage: response.data.data.per_page,
                    totalItem: response.data.data.total,
                });
                setLastPage(response.data.data.last_page);
            })
            .catch(error => {
                console.log('Error fetching users:', error);
            })
            .finally(() => {
                setLoading((prev) => ({ ...prev, fetchUsers: false }))
            });
    }
    function fetchRoleData() {
        setLoading((prev) => ({ ...prev, fetchRoles: true }))
        api.get('/api/v1/roles/select')
            .then(response => {
                setRoles(response.data.data);
            })
            .catch(error => {
                console.log('Error fetching users:', error);
            })
            .finally(() => {
                setLoading((prev) => ({ ...prev, fetchRoles: false }))
            });
    }

    useEffect(() => {
        fetchData()
        fetchRoleData()
    }, []);

    useEffect(() => {
        fetchData()
    }, [searchTerm, currentPage])

    return (
        <SidebarLayout>
            <div className="p-4 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center bg-white p-4 rounded-2xl border shadow-xs">
                    <div>
                        <h1 className="text-3xl font-bold">User Management</h1>
                        <p className="text-gray-600">Manage users, roles, and permissions</p>
                    </div>
                    <CreateUser
                        isCreateDialogOpen={isCreateDialogOpen}
                        setIsCreateDialogOpen={setIsCreateDialogOpen}
                        formData={formData}
                        setFormData={setFormData}
                        handleCreateUser={handleCreateUser}
                        roles={roles}
                    />
                </div>

                <div>
                    <UserTable
                        loading={loading.fetchUsers}
                        filteredUsers={users}
                        handleEditUser={handleEditUser}
                        handleDeleteUser={openDeleteDialog}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <Paginate
                        currentPage={currentPage}
                        lastPage={lastPage}
                        handlePageChange={(page) => { setCurrentPage(page) }}
                        dataMark={dataMark}
                    />
                </div>

                <EditUserModal
                    isEditDialogOpen={isEditDialogOpen}
                    setIsEditDialogOpen={setIsEditDialogOpen}
                    formData={formData}
                    setFormData={setFormData}
                    handleUpdateUser={handleUpdateUser}
                    roles={roles}
                />

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete User</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete user <span className="font-bold">{userToDelete?.name}</span>? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </SidebarLayout>
    )
}
