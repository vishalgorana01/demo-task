// src/components/KanbanColumn.tsx

import { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import { KanbanCard } from './KanbanCard'
import { TaskWithId, TaskStatus } from "@/lib/definations"

type KanbanColumnProps = {
  title: TaskStatus
  tasks: TaskWithId[]
  provided: DroppableProvided
  isDraggingOver: boolean
  onDeleteTask: (id: string) => void
}

export function KanbanColumn({ title, tasks, provided, isDraggingOver, onDeleteTask }: KanbanColumnProps) {
  return (
    <div
      className={`flex-shrink-0 w-80 bg-zinc-200 dark:bg-zinc-800 rounded-lg p-4 transition-colors duration-200 ease-in-out
        ${isDraggingOver ? 'bg-zinc-300 dark:bg-zinc-700' : ''}`}
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
        {title} <span className="text-sm font-normal">({tasks.length})</span>
      </h2>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <KanbanCard key={task._id} task={task} index={index} onDeleteTask={onDeleteTask} />
        ))}
        {provided.placeholder}
      </div>
    </div>
  )
}