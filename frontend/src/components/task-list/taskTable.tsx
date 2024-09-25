import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import Link from 'next/link'
import { TaskWithId } from "@/lib/definations"

type TaskTableProps = {
  tasks: TaskWithId[]
  onDeleteTask: (id: string) => void
  onTaskClick: (task: TaskWithId) => void
}

export function TaskTable({ tasks, onDeleteTask, onTaskClick }: TaskTableProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-500 text-white'
      case 'Medium': return 'bg-yellow-500 text-white'
      case 'High': return 'bg-red-500 text-white'
      default: return 'bg-zinc-500 text-white'
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead className="hidden sm:table-cell w-[140px]">Status</TableHead>
          <TableHead className="hidden md:table-cell">Priority</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task._id} onClick={() => onTaskClick(task)} className="cursor-pointer">
            <TableCell>{task.title}</TableCell>
            <TableCell className="hidden sm:table-cell">{task.status}</TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href={`/editTask?id=${task._id}`}>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation()
                    onDeleteTask(task._id)
                  }}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}