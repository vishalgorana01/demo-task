// src/components/kanban/KanbanBoard.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { DndContext, DragOverlay, pointerWithin, KeyboardSensor, PointerSensor, useSensor, useSensors, DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates} from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';
import { TaskWithId, TaskStatus } from "@/lib/definations";
import { fetchTasks, updateTaskStatus, deleteTask } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export function KanbanBoard() {
  const [tasks, setTasks] = useState<TaskWithId[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columns: TaskStatus[] = ['To Do', 'In Progress', 'Completed'];

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch tasks. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) {
      console.log('No over target');
      return;
    }
    
    const activeTask = tasks.find(task => task._id === active.id);
    const overTask = tasks.find(task => task._id === over.id);

    if (!activeTask || !overTask) return;

    if (activeTask.status !== overTask.status) {
      setTasks(tasks => {
        const oldIndex = tasks.findIndex(task => task._id === active.id);
        const newIndex = tasks.findIndex(task => task._id === over.id);
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
  
    const activeTask = tasks.find(task => task._id === active.id);
    if (!activeTask) return;
  
    const overColumn = over.id as TaskStatus;
    console.log('Active Task:', activeTask);
    console.log('Over Column:', overColumn);
  
    if (activeTask.status !== overColumn) {
      try {
        await updateTaskStatus(activeTask._id, overColumn);
        setTasks(tasks => {
          return tasks.map(task => 
            task._id === activeTask._id ? { ...task, status: overColumn } : task
          );
        });
        toast({
          title: "Success",
          description: `Task moved to ${overColumn}`,
        });
      } catch {
        console.error('Error updating task status:');
        toast({
          title: "Error",
          description: "Failed to update task status. Please try again.",
          variant: "destructive",
        });
      }
    }
  
    setActiveId(null);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    } catch  {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column}
            title={column}
            tasks={tasks.filter(task => task.status === column)}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
      <DragOverlay>
        {activeId ? <TaskCard task={tasks.find(task => task._id === activeId) as TaskWithId} onDeleteTask={handleDeleteTask} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}