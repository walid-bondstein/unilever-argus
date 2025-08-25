import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'

export default function TableSkeleton() {
    return (
        Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-8 w-20" /></TableCell>
            </TableRow>
        ))
    )
}
