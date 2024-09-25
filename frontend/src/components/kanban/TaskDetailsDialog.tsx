import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TaskWithId } from "@/lib/definations";

interface TaskDetailsDialogProps {
  task: TaskWithId;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskDetailsDialog({ task, isOpen, onClose }: TaskDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          {task.dueDate && (
            <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
          )}
          {task.description && (
            <p><strong>Description:</strong> {task.description}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}