'use client'

import DragDropContext from "@/context/DragDropContext";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

export default function KanbanPage() {
  return ( 
  //  <DragDropContext onDragEnd={}>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <KanbanBoard />
    </div>
  // </DragDropContext>
  );
}