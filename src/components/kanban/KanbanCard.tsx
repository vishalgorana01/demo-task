// src/components/kanban/KanbanCard.tsx

import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { TaskWithId } from "@/lib/definations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { format } from 'date-fns'
import Link from 'next/link'
import { TaskCard } from './TaskCard'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type KanbanCardProps = {
  task: TaskWithId
  index: number
  onDeleteTask: (id: string) => void
}

export function KanbanCard({ task, index, onDeleteTask }: KanbanCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-500 text-white'
      case 'Medium': return 'bg-yellow-500 text-white'
      case 'High': return 'bg-red-500 text-white'
      default: return 'bg-zinc-500 text-white'
    }
  }

  return (
    <>
      <Draggable draggableId={task._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-rbd-drag-handle-draggable-id={task._id}
            className={`bg-white dark:bg-zinc-700 rounded-lg shadow p-4 cursor-grab transition-all duration-200 ease-in-out
              ${snapshot.isDragging ? 'opacity-75 shadow-lg' : ''}
              hover:outline hover:outline-2 hover:outline-blue-500`}
            onClick={() => setIsDialogOpen(true)}
          >
            <div className="flex justify-between items-start mb-2">
              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
            </div>
            <h3 className="text-lg font-semibold mt-2 text-zinc-900 dark:text-zinc-100">{task.title}</h3>
            {task.dueDate && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Due on {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </p>
            )}
          </div>
        )}
      </Draggable>
      <TaskCard task={task} onClose={() => setIsDialogOpen(false)} isOpen={isDialogOpen} />
    </>
  )
}