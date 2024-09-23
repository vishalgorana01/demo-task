'use client'

import React from "react";
import { useThemeContext} from "@/context/theme-context"
import { Button } from "@/components/ui/button"
import { KanbanSquare, ListTodo } from "lucide-react"

export 
default function HeroPage() {
  const { theme } = useThemeContext();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${theme === "dark" ? "dark" : ""}`}>
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-zinc-900 dark:text-zinc-100">
          Task Management Dashboard
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Organize your tasks efficiently with our powerful Kanban board and task list features.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button className="w-full sm:w-auto">
            Login
          </Button>
          <Button variant="outline" className="w-full sm:w-auto text-zinc-900 dark:text-zinc-100">
            Sign Up
          </Button>
        </div>
        <div className="pt-8 p-3 grid grid-cols-1 sm:grid-cols-2 gap-8 ">
          <div className="flex flex-col items-center space-y-4 p-6 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <KanbanSquare className="h-12 w-12 text-zinc-900 dark:text-zinc-100" />
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Kanban Board</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Visualize your workflow and manage tasks with our intuitive Kanban board.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <ListTodo className="h-12 w-12 text-zinc-900 dark:text-zinc-100" />
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Task List</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Keep track of all your tasks with our comprehensive and easy-to-use task list.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}