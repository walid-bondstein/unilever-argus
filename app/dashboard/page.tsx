"use client"
import CameraCard from '@/components/camrea/CameraCard';
import SidebarLayout from '@/components/ui/layouts/sidebarLayout'
import { api } from '@/lib/axios/axios'
import { Camera } from '@/types';
import { Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Page() {
    const [cameras, setCameras] = useState<Camera[]>([]);
    const [loadings, setLoadings] = useState<{
        [key: string]: boolean,
    }>({
        fetchCameras: false,
    });
    const router = useRouter()

    function fetchData() {
        setLoadings(prev => ({ ...prev, fetchCameras: true }));
        api.get("api/v1/cameras/view-cameras")
            .then(response => {
                setCameras(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setLoadings(prev => ({ ...prev, fetchCameras: false }));
            });
    }

    useEffect(() => {
        fetchData()
    }, []);

    const handleCameraClick = (cameraId: number) => {
        router.push(`/cameras?camera=${cameraId}`)
    }

    return (
        <SidebarLayout>
            <div className="flex-1">
                <div className="p-6">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">Camera Dashboard</h1>
                        <p className="mt-2 text-muted-foreground">Monitor and manage your security cameras</p>
                    </div>

                    {
                        loadings.fetchCameras ? (
                            <div className="text-center py-12  animate-pulse">
                                <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Loading cameras...</h3>
                                <p className="text-muted-foreground">Please wait while we fetch your camera data.</p>
                            </div>
                        ) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {cameras.slice(0, 2).map((camera) => (
                                <CameraCard key={camera.id} camera={camera} handleCameraClick={handleCameraClick} />
                            ))}
                        </div>)
                    }


                    {((cameras.length === 0) && !loadings.fetchCameras) && (
                        <div className="text-center py-12">
                            <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No cameras found</h3>
                            <p className="text-muted-foreground">Add cameras to start monitoring your security system.</p>
                        </div>
                    )}
                </div>
            </div>
        </SidebarLayout>
    )
}
