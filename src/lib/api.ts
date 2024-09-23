import { TaskWithId, Task, TaskStatus } from "@/lib/definations"

export async function createTask(task: Task): Promise<TaskWithId> {
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("No authentication token found")
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_ADDR}/api/task/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to create task")
  }

  return response.json()
}

export async function updateTask(taskId: string, task: Partial<Task>): Promise<TaskWithId> {
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("No authentication token found")
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_ADDR}/api/task/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to update task")
  }

  return response.json()
}

export async function updateTaskStatus(taskId: string, newStatus: TaskStatus): Promise<TaskWithId> {
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("No authentication token found")
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_ADDR}/api/task/${taskId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: newStatus }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to update task status")
  }
  return response.json()
}

export async function getTask(taskId: string): Promise<TaskWithId> {
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("No authentication token found")
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_ADDR}/api/task/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to fetch task")
  }

  return response.json()
}

export async function fetchTasks(): Promise<TaskWithId[]> {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No authentication token found')
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_ADDR}/api/task/`, {
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

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_ADDR}/api/task/${id}`, {
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