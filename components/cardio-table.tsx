"use client"

import { format } from "date-fns"
import { MoreHorizontal } from 'lucide-react'
import { type CardioProgram } from "@/types/cardio"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation"

interface CardioTableProps {
  programs: CardioProgram[]
  clientId: string
}

export default function CardioTable({ programs, clientId }: CardioTableProps) {
  const router = useRouter()

  const handleRowClick = (programId: string) => {
    router.push(`/coach/clients/${clientId}/cardio/programs/${programId}`)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Program Name</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="w-[400px]">Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No programs found
              </TableCell>
            </TableRow>
          ) : (
            programs.map((program) => (
              <TableRow key={program.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleRowClick(program.id)}>
                <TableCell className="font-medium">{program.name}</TableCell>
                <TableCell>{format(new Date(program.startDate), "MM/dd/yyyy")}</TableCell>
                <TableCell>
                  {program.endDate ? format(new Date(program.endDate), "MM/dd/yyyy") : "N/A"}
                </TableCell>
                <TableCell>{program.description}</TableCell>
                <TableCell>
                  <Badge 
                    variant={program.status === "active" ? "success" : "destructive"}
                    className="capitalize"
                  >
                    {program.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit program</DropdownMenuItem>
                      <DropdownMenuItem>Delete program</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

