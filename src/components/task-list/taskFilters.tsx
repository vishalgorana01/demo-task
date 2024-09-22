import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { useDebounce } from 'use-debounce'

type TaskFiltersProps = {
  filter: 'all' | 'To Do' | 'In Progress' | 'Completed'
  setFilter: (value: 'all' | 'To Do' | 'In Progress' | 'Completed') => void
  priority: 'all' | 'Low' | 'Medium' | 'High'
  setPriority: (value: 'all' | 'Low' | 'Medium' | 'High') => void
  searchQuery: string
  setSearchQuery: (value: string) => void
}

export function TaskFilters({ 
  filter, 
  setFilter, 
  priority, 
  setPriority, 
  searchQuery, 
  setSearchQuery 
}: TaskFiltersProps) {
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [isPriorityOpen, setIsPriorityOpen] = useState(false)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const [debouncedSearchQuery] = useDebounce(localSearchQuery, 500)

  useEffect(() => {
    setSearchQuery(debouncedSearchQuery)
  }, [debouncedSearchQuery, setSearchQuery])

  const statuses = ['all', 'To Do', 'In Progress', 'Completed']
  const priorities = ['all', 'Low', 'Medium', 'High']

  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="flex space-x-2 sm:space-x-4 md:space-x-8 lg:space-x-32">
        <Input
          placeholder="Filter tasks..."
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Link href="/createTask">
          <Button>Create Task</Button>
        </Link>
      </div>
      <div className="flex space-x-2">
        <Popover open={isStatusOpen} onOpenChange={setIsStatusOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[120px] justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Status
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <div className="flex flex-col">
              {statuses.map((status) => (
                <Button
                  key={status}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setFilter(status as any)
                    setIsStatusOpen(false)
                  }}
                >
                  <Check className={cn(
                    "mr-2 h-4 w-4",
                    filter === status ? "opacity-100" : "opacity-0"
                  )} />
                  {status}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Popover open={isPriorityOpen} onOpenChange={setIsPriorityOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[120px] justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Priority
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <div className="flex flex-col">
              {priorities.map((p) => (
                <Button
                  key={p}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setPriority(p as any)
                    setIsPriorityOpen(false)
                  }}
                >
                  <Check className={cn(
                    "mr-2 h-4 w-4",
                    priority === p ? "opacity-100" : "opacity-0"
                  )} />
                  {p}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}