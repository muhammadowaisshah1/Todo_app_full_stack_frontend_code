"use client";

import { Task } from "@/hooks/use-tasks";
import { TaskItem } from "./task-item";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
