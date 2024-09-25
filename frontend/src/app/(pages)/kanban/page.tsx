'use client'

import { useThemeContext } from '@/context/theme-context';
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from 'next/link';

export default function KanbanPage() {
  const { theme } = useThemeContext();

  return ( 
    <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-zinc-900 text-zinc-100' : 'bg-zinc-100 text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Kanban Board</h1>
          <Link href="/createTask">
            <Button className="bg-zinc-800 dark:bg-zinc-100 dark:bg- hover:bg-emerald-600 text-zinc-100">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          </Link>
        </div>
        <KanbanBoard />
      </div>
    </div>
  );
}