"use client"

import { format } from "date-fns"
import { MoreHorizontal } from 'lucide-react'
import { useRouter } from "next/navigation"
import { type SupplementPlan } from "@/types/supplement"
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

interface SupplementsTableProps {
  plans: SupplementPlan[]
  clientId: string
}

export default function SupplementsTable({ plans, clientId }: SupplementsTableProps) {
  const router = useRouter()

  const handleRowClick = (planId: string) => {
    router.push(`/coach/clients/${clientId}/supplements/plans/${planId}`)
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
          {plans.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No plans found
              </TableCell>
            </TableRow>
          ) : (
            plans.map((plan) => (
              <TableRow 
                key={plan.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(plan.id)}
              >
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>{format(new Date(plan.startDate), "MM/dd/yyyy")}</TableCell>
                <TableCell>
                  {plan.endDate ? format(new Date(plan.endDate), "MM/dd/yyyy") : "N/A"}
                </TableCell>
                <TableCell>{plan.description}</TableCell>
                <TableCell>
                  <Badge 
                    variant={plan.status === "active" ? "success" : "destructive"}
                    className="capitalize"
                  >
                    {plan.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit plan</DropdownMenuItem>
                      <DropdownMenuItem>Delete plan</DropdownMenuItem>
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

