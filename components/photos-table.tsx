"use client"

import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { MoreHorizontal, Image } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { type PhotoSubmission } from "@/types/photo-submission"

interface PhotosTableProps {
  submissions: PhotoSubmission[]
  clientId: string
}

export function PhotosTable({ submissions, clientId }: PhotosTableProps) {
  const router = useRouter()

  const handleRowClick = (submissionId: string) => {
    router.push(`/coach/clients/${clientId}/submissions/photos/${submissionId}`)
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">Photo Submissions</h2>
        <p className="text-sm text-muted-foreground">
          Select a submission to view progress photos.
        </p>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Photos</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No photo submissions found
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow 
                  key={submission.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(submission.id)}
                >
                  <TableCell>
                    {format(new Date(submission.date), "MM/dd/yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Image className="h-4 w-4 text-muted-foreground" />
                      <span>{submission.photoCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Delete submission</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

