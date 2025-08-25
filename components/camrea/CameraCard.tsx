import React from 'react'
import { Camera } from '@/types';
import { Video } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export default function CameraCard({
  camera,
  handleCameraClick
}: {
  camera: Camera,
  handleCameraClick: (cameraId: number) => void
}) {
  return (
    <Card className='py-4 hover:shadow-lg cursor-pointer' onClick={() => handleCameraClick(camera.id)}>
      <CardContent className='px-4'>
        <div className="flex justify-start items-center gap-4">
          <div className={`p-3 max-w-min rounded-full ${camera.status === 0 ? "bg-green-100" : "bg-red-100"}`}>
            <Video className={`h-8 w-8 ${camera.status === 0 ? "text-green-600" : "text-red-600"}`} />
          </div>
          <div>
            <p className="text-base text-gray-600 text-center">Name: {camera.camera_name}</p>
            <p className="text-base text-gray-600 text-center">Code: {camera.camera_code}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
