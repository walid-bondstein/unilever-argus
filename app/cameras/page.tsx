"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, RotateCcw } from "lucide-react"
import SidebarLayout from "@/components/ui/layouts/sidebarLayout"

export default function SearchPage() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [filters, setFilters] = useState(() => ({
        camera: searchParams.get("camera") || "",
        startDate: searchParams.get("start_date") || "",
        endDate: searchParams.get("end_date") || "",
        status: searchParams.get("status") || "",
    }))

    const handleInputChange = (field: string, value: string) => {
        setFilters((prev) => ({ ...prev, [field]: value }))
    }

    const handleSearch = () => {
        const params = new URLSearchParams()
        const paramMapping = {
            camera: "camera",
            startDate: "start_date",
            endDate: "end_date",
            status: "status",
        }

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                const paramName = paramMapping[key as keyof typeof paramMapping]
                params.set(paramName, value)
            }
        })

        const queryString = params.toString()
        router.push(`/cameras${queryString ? `?${queryString}` : ""}`)
    }

    const handleReset = () => {
        setFilters({
            camera: "",
            startDate: "",
            endDate: "",
            status: "",
        })
        router.push("/cameras")
    }


    useEffect(() => {
        console.log(filters)
    }, [searchParams]);

    return (
        <SidebarLayout>
            <div className="p-4">
                <Card className="shadow-none">
                    <CardContent className="space-y-6">
                        <div className="flex flex-wrap items-end gap-4">
                            <div className="flex-1 min-w-[200px] space-y-2">
                                <Label htmlFor="camera">Camera Search</Label>
                                <Input
                                    id="camera"
                                    placeholder="Search cameras..."
                                    value={filters.camera}
                                    onChange={(e) => handleInputChange("camera", e.target.value)}
                                />
                            </div>

                            <div className="flex-1 min-w-[150px] space-y-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    value={filters.startDate}
                                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                                />
                            </div>

                            <div className="flex-1 min-w-[150px] space-y-2">
                                <Label htmlFor="endDate">End Date</Label>
                                <Input
                                    id="endDate"
                                    type="date"
                                    value={filters.endDate}
                                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                                />
                            </div>

                            <div className="flex-1 min-w-[150px] space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={filters.status} onValueChange={(value) => handleInputChange("status", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">Active</SelectItem>
                                        <SelectItem value="1">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-2">
                                <Button onClick={handleSearch} className="flex items-center gap-2">
                                    <Search className="h-4 w-4" />
                                    Search
                                </Button>
                                <Button variant="outline" onClick={handleReset} className="flex items-center gap-2 bg-transparent">
                                    <RotateCcw className="h-4 w-4" />
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </SidebarLayout>
    )
}
