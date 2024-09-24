// src/components/kanban/KanbanColumn.tsx
'use client'

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { TaskWithId, TaskStatus } from "@/lib/definations";

interface KanbanColumnProps {
  title: TaskStatus;
  tasks: TaskWithId[];
  onDeleteTask: (id: string) => void;
}

export function KanbanColumn({ title, tasks, onDeleteTask }: KanbanColumnProps) {
  const { isOver ,setNodeRef } = useDroppable({
    id: title,
  });

  const style = {
    color: isOver ? 'bg-zinc-400 dark:bg-zinc-600' : undefined,
  }

  return (
    <div className="flex-shrink-0 w-80 bg-zinc-200 dark:bg-zinc-800 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
        {title} <span className="text-sm font-normal">({tasks.length})</span>
      </h2>
      <div
        ref={setNodeRef} style={style}
        data-status = {title}
        className="min-h-[calc(100vh-200px)] space-y-4"
      >
        <SortableContext items={tasks.map(task => task._id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onDeleteTask={onDeleteTask} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}