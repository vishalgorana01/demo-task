// src/components/kanban/TaskCard.tsx
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TaskWithId } from "@/lib/definations";
import { TaskDetailsDialog } from './TaskDetailsDialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import { format } from 'date-fns';

interface TaskCardProps {
  task: TaskWithId;
  onDeleteTask: (id: string) => void;
  isDragging?: boolean;
}

export function TaskCard({ task, onDeleteTask, isDragging }: TaskCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      case 'High': return 'bg-red-500 text-white';
      default: return 'bg-zinc-500 text-white';
    }
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className={`bg-white dark:bg-zinc-700 ${isDragging ? 'opacity-50' : ''}`}
      >
        <CardContent className="p-4 cursor-pointer" onClick={() => setIsDialogOpen(true)}>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="p-1 mr-2"
                {...attributes}
                {...listeners}
              >
                <GripVertical className="h-4 w-4" />
              </Button>
              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`/editTask?id=${task._id}`} passHref>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onSelect={(e) => {
                  e.preventDefault();
                  onDeleteTask(task._id);
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
        </CardContent>
      </Card>
      <TaskDetailsDialog task={task} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  );
}