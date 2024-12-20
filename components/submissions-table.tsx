"use client"

import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { MoreHorizontal } from 'lucide-react'
import { type Submission } from "@/types/submission"
import { Button } from "@/components/ui/button"

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
import { Badge } from "@/components/ui/badge"
import { NewFormDialog } from "@/components/form-builder/new-form-dialog"

interface SubmissionsTableProps {
  submissions: Submission[]
  clientId: string
}

export function SubmissionsTable({ submissions, clientId }: SubmissionsTableProps) {
  const router = useRouter()

  const handleRowClick = (submissionId: string) => {
    router.push(`/coach/clients/${clientId}/submissions/${submissionId}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Check-In Submissions</h2>
          <p className="text-sm text-muted-foreground">
            Select a submission to view and provide feedback.
          </p>
        </div>
        <NewFormDialog />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Form Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No submissions found
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
                  <TableCell>{submission.formName}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={submission.status === "pending" ? "warning" : "success"}
                    >
                      {submission.status === "pending" ? "Pending" : "Reviewed"}
                    </Badge>
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

