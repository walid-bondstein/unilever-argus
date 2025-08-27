"use client"
import { useProfile } from "@/hooks/useProfile"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import SidebarLayout from "@/components/ui/layouts/sidebarLayout"
import { ProfileForm } from "@/components/profile/profile-form"

export default function ProfilePage() {
    const { profile, loading, error, updateProfile } = useProfile()

    if (loading && !profile) {
        return (
            <SidebarLayout>
                <div className="h-full overflow-auto">
                    <div className="min-h-full flex items-center justify-center p-4">
                        <Card className="w-full max-w-md">
                            <CardContent className="flex flex-col items-center justify-center p-8">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
                                <p className="text-gray-600">Loading profile...</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarLayout>
        )
    }

    if (error && !profile) {
        return (
            <SidebarLayout>
                <div className="h-full overflow-auto">
                    <div className="p-4">
                        <Alert variant="destructive" className="max-w-2xl mx-auto">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    </div>
                </div>
            </SidebarLayout>
        )
    }

    if (!profile) {
        return (
            <SidebarLayout>
                <div className="h-full overflow-auto">
                    <div className="p-4">
                        <Alert className="max-w-2xl mx-auto">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>No profile data available.</AlertDescription>
                        </Alert>
                    </div>
                </div>
            </SidebarLayout>
        )
    }

    return (
        <SidebarLayout>
            <div className="h-full overflow-auto bg-gray-50">
                <div className="min-h-full py-6 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto">

                        <div className="w-full">
                            <ProfileForm profile={profile} onUpdate={updateProfile} isLoading={loading} />
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    )
}
