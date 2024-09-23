// src/components/kanban/TaskCard.tsx

import { useTheme } from 'next-themes'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from 'lucide-react'
import { TaskWithId } from '@/lib/definations'

type TaskDetailsProps = {
  task: TaskWithId
  onClose: () => void
  isOpen: boolean
}

export function TaskCard({ task, onClose, isOpen }: TaskDetailsProps) {
  const { theme } = useTheme()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-500 text-white'
      case 'Medium': return 'bg-yellow-500 text-white'
      case 'High': return 'bg-red-500 text-white'
      default: return 'bg-zinc-500 text-white'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[425px] ${theme === 'dark' ? 'bg-zinc-800 text-zinc-100' : 'bg-white text-zinc-900'}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{task.title}</DialogTitle>
          <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
            Task Details
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Status:</span>
            <span className="col-span-3">{task.status}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Priority:</span>
            <span className="col-span-3">
              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
            </span>
          </div>
          {task.dueDate && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right font-medium">Due Date:</span>
              <span className="col-span-3 flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}
          {task.description && (
            <div className="grid grid-cols-4 items-start gap-4">
              <span className="text-right font-medium">Description:</span>
              <p className="col-span-3">{task.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}