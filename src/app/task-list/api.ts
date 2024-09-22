import { TaskWithId } from "@/lib/definations"

export async function fetchTasks(): Promise<TaskWithId[]> {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No authentication token found')
  }

  const response = await fetch('http://localhost:3001/api/tasks', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (response.status === 401) {
    throw new Error('Unauthorized')
  }

  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }

  return response.json()
}

export async function deleteTask(id: string): Promise<void> {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No authentication token found')
  }

  const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (response.status === 401) {
    throw new Error('Unauthorized')
  }

  if (!response.ok) {
    throw new Error('Failed to delete task')
  }
}