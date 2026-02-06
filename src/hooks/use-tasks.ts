"use client";

import useSWR from "swr";
import { api, APIError } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

interface CreateTaskData {
  title: string;
  description?: string;
}

interface UpdateTaskData {
  title?: string;
  description?: string;
}

const fetcher = async (url: string) => {
  return api.get<Task[]>(url);
};

export function useTasks(filter?: string) {
  const { user } = useAuth();
  const userId = user?.id;

  const queryParams = filter ? `?status=${filter}` : "";
  const key = userId ? `/api/${userId}/tasks${queryParams}` : null;

  const { data, error, isLoading, mutate } = useSWR<Task[]>(key, fetcher, {
    revalidateOnFocus: false,
  });

  const createTask = async (taskData: CreateTaskData): Promise<Task> => {
    if (!userId) throw new Error("User not authenticated");

    const newTask = await api.post<Task>(`/api/${userId}/tasks`, taskData);

    // Optimistic update
    mutate((currentTasks) => {
      if (!currentTasks) return [newTask];
      return [newTask, ...currentTasks];
    }, false);

    return newTask;
  };

  const updateTask = async (
    taskId: string,
    taskData: UpdateTaskData
  ): Promise<Task> => {
    if (!userId) throw new Error("User not authenticated");

    const updatedTask = await api.put<Task>(
      `/api/${userId}/tasks/${taskId}`,
      taskData
    );

    // Optimistic update
    mutate((currentTasks) => {
      if (!currentTasks) return [updatedTask];
      return currentTasks.map((t) => (t.id === taskId ? updatedTask : t));
    }, false);

    return updatedTask;
  };

  const toggleComplete = async (taskId: string): Promise<Task> => {
    if (!userId) throw new Error("User not authenticated");

    // Optimistic update
    mutate((currentTasks) => {
      if (!currentTasks) return currentTasks;
      return currentTasks.map((t) =>
        t.id === taskId ? { ...t, is_completed: !t.is_completed } : t
      );
    }, false);

    try {
      const updatedTask = await api.patch<Task>(
        `/api/${userId}/tasks/${taskId}/complete`
      );
      return updatedTask;
    } catch (error) {
      // Revert on error
      mutate();
      throw error;
    }
  };

  const deleteTask = async (taskId: string): Promise<void> => {
    if (!userId) throw new Error("User not authenticated");

    // Optimistic update
    mutate((currentTasks) => {
      if (!currentTasks) return currentTasks;
      return currentTasks.filter((t) => t.id !== taskId);
    }, false);

    try {
      await api.delete(`/api/${userId}/tasks/${taskId}`);
    } catch (error) {
      // Revert on error
      mutate();
      throw error;
    }
  };

  return {
    tasks: data || [],
    isLoading,
    error,
    mutate,
    createTask,
    updateTask,
    toggleComplete,
    deleteTask,
  };
}
