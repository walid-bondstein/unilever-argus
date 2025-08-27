"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X } from "lucide-react"
import { toast } from "sonner"

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

interface ProfileFormProps {
    profile: Profile
    onUpdate: (updatedProfile: Partial<Profile>) => Promise<void>
    isLoading?: boolean
}

export function ProfileForm({ profile, onUpdate, isLoading = false }: ProfileFormProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: profile.name || "",
        phone: profile.phone || "",
        address: profile.address || "",
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        try {
            await onUpdate(formData)
            setIsEditing(false)
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error("Failed to update profile")
        }
    }

    const handleCancel = () => {
        setFormData({
            name: profile.name || "",
            phone: profile.phone || "",
            address: profile.address || "",
        })
        setIsEditing(false)
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
    }

    return (
        <Card className="w-full shadow-lg">
            <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
                        <AvatarImage src={profile.image || "/placeholder.svg"} alt={profile.name} />
                        <AvatarFallback className="text-lg  text-white">{getInitials(profile.name)}</AvatarFallback>
                    </Avatar>
                </div>
                <CardTitle className="text-2xl text-gray-800">Profile Information</CardTitle>
                <div className="flex justify-center mt-4">
                    {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)} className="gap-2  ">
                            <Edit3 className="h-4 w-4" />
                            Edit Profile
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button onClick={handleSave} disabled={isLoading} className="gap-2 ">
                                <Save className="h-4 w-4" />
                                Save Changes
                            </Button>
                            <Button variant="outline" onClick={handleCancel} disabled={isLoading} className="gap-2 bg-transparent">
                                <X className="h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <User className="h-4 w-4 " />
                            Full Name
                        </Label>
                        {isEditing ? (
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                placeholder="Enter your full name"
                                className="focus:ring-2 "
                            />
                        ) : (
                            <div className="p-3 bg-gray-50 rounded-lg border">{profile.name}</div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Mail className="h-4 w-4 " />
                            Email Address
                        </Label>
                        <div className="p-3 bg-gray-100 rounded-lg border text-gray-600">{profile.email}</div>
                        <p className="text-xs text-gray-500">Email cannot be changed</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Phone className="h-4 w-4 " />
                            Phone Number
                        </Label>
                        {isEditing ? (
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                placeholder="Enter your phone number"
                                className="focus:ring-2 "
                            />
                        ) : (
                            <div className="p-3 bg-gray-50 rounded-lg border">{profile.phone || "Not provided"}</div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <MapPin className="h-4 w-4 " />
                            Address
                        </Label>
                        {isEditing ? (
                            <Input
                                id="address"
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                                placeholder="Enter your address"
                                className="focus:ring-2 "
                            />
                        ) : (
                            <div className="p-3 bg-gray-50 rounded-lg border">{profile.address || "Not provided"}</div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <Calendar className="h-4 w-4 " />
                                Member Since
                            </Label>
                            <div className="text-sm text-gray-800 font-medium">
                                {new Date(profile.created_at).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <Calendar className="h-4 w-4 " />
                                Last Updated
                            </Label>
                            <div className="text-sm text-gray-800 font-medium">
                                {new Date(profile.updated_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
