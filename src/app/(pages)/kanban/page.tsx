// src/app/(pages)/kanban/page.tsx

'use client'

import { useState, useEffect } from 'react'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { PlusIcon } from "lucide-react"

import { useThemeContext } from "@/context/theme-context"
import DragDropContext from '@/context/DragDropContext'

import { KanbanBoard } from "@/components/kanban/KanbanBoard"
import { TaskWithId, TaskStatus } from "@/lib/definations"
import { fetchTasks, updateTaskStatus, deleteTask } from "@/lib/api"

export default function KanbanPage() {
  const { theme } = useThemeContext()
  const [tasks, setTasks] = useState<TaskWithId[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    setIsLoading(true)
    try {
      const fetchedTasks = await fetchTasks()
      setTasks(fetchedTasks)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tasks. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTaskMove = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus)
      setTasks(prevTasks => prevTasks.map(task => 
        task._id === taskId ? { ...task, status: newStatus } : task
      ))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter(task => task._id !== id))
      toast({
        title: "Success",
        description: "Task deleted successfully",
      })
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        })
      } else {
        setError('An unknown error occurred while deleting the task')
        toast({
          title: "Error",
          description: "An unknown error occurred while deleting the task",
          variant: "destructive",
        })
      }
    }
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    if (source.droppableId !== destination.droppableId) {
      handleTaskMove(draggableId, destination.droppableId as TaskStatus);
    }
  }

  return (
    <div className={`min-h-screen p-4 ${theme === "dark" ? "dark" : ""} bg-zinc-100 dark:bg-zinc-900`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Kanban Board</h1>
        <Link href="/createTask">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" /> Create Task
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-zinc-600 dark:text-zinc-400">Loading tasks...</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <KanbanBoard tasks={tasks} onDeleteTask={handleDeleteTask} onTaskMove={handleTaskMove} />
        </DragDropContext>
      )}
    </div>
  )
}