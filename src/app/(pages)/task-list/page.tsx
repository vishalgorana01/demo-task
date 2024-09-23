'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { TaskTable } from '@/components/task-list/taskTable'
import { TaskFilters } from '@/components/task-list/taskFilters'
import { TaskCard } from '@/components/task-list/taskCard'
import { fetchTasks, deleteTask } from '@/lib/api'
import { TaskWithId } from '@/lib/definations'
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function TaskList() {
  const [tasks, setTasks] = useState<TaskWithId[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'To Do' | 'In Progress' | 'Completed'>('all')
  const [priority, setPriority] = useState<'all' | 'Low' | 'Medium' | 'High'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTask, setSelectedTask] = useState<TaskWithId | null>(null)
  const { theme } = useTheme()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks()
      setTasks(fetchedTasks)
      setLoading(false)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        })
      } else {
        setError('An unknown error occurred')
        toast({
          title: "Error",
          description: "An unknown error occurred",
          variant: "destructive",
        })
      }
      setLoading(false)
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

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter
    const matchesPriority = priority === 'all' || task.priority === priority
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesPriority && matchesSearch
  })

  const handleTaskClick = useCallback((task: TaskWithId) => {
    setSelectedTask(task)
  }, [])

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-900 text-zinc-100' : 'bg-zinc-100 text-zinc-900'}`}>
      <div className="max-w-7xl w-[75%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Task List</h1>
          </div>
          <div className="mb-6">
            <TaskFilters
              filter={filter}
              setFilter={setFilter}
              priority={priority}
              setPriority={setPriority}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className="bg-white dark:bg-zinc-800 shadow-sm rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <TaskTable
                  tasks={filteredTasks}
                  onDeleteTask={handleDeleteTask}
                  onTaskClick={handleTaskClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedTask && (
        <TaskCard task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
      <Toaster />
    </div>
  )
}