// src/components/kanban/KanbanBoard.tsx

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { KanbanColumn } from './KanbanColumn'
import { TaskWithId, TaskStatus } from "@/lib/definations"
import { useState } from 'react'

type KanbanBoardProps = {
  tasks: TaskWithId[]
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void
  onDeleteTask: (id: string) => void
}

export function KanbanBoard({ tasks: initialTasks, onTaskMove, onDeleteTask }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<TaskWithId[]>(initialTasks)
  const columns: TaskStatus[] = ['To Do', 'In Progress', 'Completed']

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
  
    const { source, destination, draggableId } = result
    const sourceColumnIndex = columns.indexOf(tasks.find(task => task._id === draggableId)?.status as TaskStatus)
    const destColumnIndex = parseInt(destination.droppableId)
  
    if (sourceColumnIndex !== destColumnIndex) {
      const newStatus = columns[destColumnIndex]
      const updatedTasks = tasks.map(task => 
        task._id === draggableId ? { ...task, status: newStatus } : task
      )
      setTasks(updatedTasks)
      onTaskMove(draggableId, newStatus)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4">
        {columns.map((column, index) => (
          <Droppable key={column} droppableId={column}>
           {(provided, snapshot) => (
              <KanbanColumn
                title={column}
                tasks={tasks.filter(task => task.status === column)}
                provided={provided}
                isDraggingOver={snapshot.isDraggingOver}
                onDeleteTask={onDeleteTask}
              />
            )} 
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}