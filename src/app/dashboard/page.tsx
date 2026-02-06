"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useTasks, Task } from "@/hooks/use-tasks";
import { TaskForm } from "@/components/tasks/task-form";
import { TaskList } from "@/components/tasks/task-list";
import { EmptyState } from "@/components/tasks/empty-state";
import { FilterTabs } from "@/components/tasks/filter-tabs";
import { EditTaskDialog } from "@/components/tasks/edit-task-dialog";
import { DeleteConfirmDialog } from "@/components/tasks/delete-confirm-dialog";

type FilterValue = "all" | "pending" | "completed";

export default function DashboardPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterValue>("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const filterParam = filter === "all" ? undefined : filter;
  const { tasks, isLoading, createTask, updateTask, toggleComplete, deleteTask } =
    useTasks(filterParam);

  const handleCreateTask = async (data: { title: string; description?: string }) => {
    await createTask(data);
  };

  const handleEditTask = async (
    taskId: string,
    data: { title?: string; description?: string }
  ) => {
    await updateTask(taskId, data);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
  };

  // ✅ Wrapper function - void return karne ke liye
  const handleToggleComplete = async (taskId: string): Promise<void> => {
    await toggleComplete(taskId);
  };

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.is_completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Welcome back{user?.name ? `, ${user.name}` : ""}!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Here&apos;s an overview of your tasks for today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Tasks", value: totalTasks, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "primary" },
          { label: "Completed", value: completedTasks, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
          { label: "Pending", value: pendingTasks, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="card-hover rounded-2xl border bg-card/80 p-5 backdrop-blur-sm"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                stat.color === "primary" ? "bg-primary/10 text-primary" :
                stat.color === "emerald" ? "bg-emerald-500/10 text-emerald-600" :
                "bg-amber-500/10 text-amber-600"
              }`}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Task Form */}
        <div className="lg:col-span-1">
          <TaskForm onSubmit={handleCreateTask} />
        </div>

        {/* Task List */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold">Your Tasks</h2>
            <FilterTabs value={filter} onChange={setFilter} />
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl bg-muted/50"
                />
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <EmptyState filter={filterParam} />
          ) : (
            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onEdit={setEditingTask}
              onDelete={setDeletingTask}
            />
          )}
        </div>
      </div>

      <EditTaskDialog
        task={editingTask}
        open={!!editingTask}
        onOpenChange={(open) => !open && setEditingTask(null)}
        onSave={handleEditTask}
      />

      <DeleteConfirmDialog
        task={deletingTask}
        open={!!deletingTask}
        onOpenChange={(open) => !open && setDeletingTask(null)}
        onConfirm={handleDeleteTask}
      />
    </div>
  );
}
