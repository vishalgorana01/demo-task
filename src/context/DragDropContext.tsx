'use client'

import dynamic from 'next/dynamic'
import { DragDropContextProps } from 'react-beautiful-dnd'

const DragDropContext = dynamic<DragDropContextProps>(
  () => import('react-beautiful-dnd').then((mod) => mod.DragDropContext),
  { ssr: false }
)

export default DragDropContext