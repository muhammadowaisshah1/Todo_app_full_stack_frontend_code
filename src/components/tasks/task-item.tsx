"use client";

import { useState } from "react";
import { Task } from "@/hooks/use-tasks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskItem({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggleComplete(task.id);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className={cn(
      "card-hover group rounded-2xl border bg-card/80 p-4 backdrop-blur-sm transition-all",
      task.is_completed && "bg-card/50"
    )}>
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={isToggling}
          className={cn(
            "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-200",
            task.is_completed
              ? "border-emerald-500 bg-emerald-500 shadow-lg shadow-emerald-500/25"
              : "border-muted-foreground/30 hover:border-primary hover:shadow-lg hover:shadow-primary/20",
            isToggling && "animate-pulse opacity-50"
          )}
          aria-label={task.is_completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.is_completed && (
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-medium transition-all",
              task.is_completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={cn(
                "mt-1 text-sm text-muted-foreground line-clamp-2",
                task.is_completed && "line-through opacity-70"
              )}
            >
              {task.description}
            </p>
          )}
          {/* Timestamp */}
          <p className="mt-2 text-xs text-muted-foreground/60">
            Created {new Date(task.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
            aria-label="Edit task"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task)}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            aria-label="Delete task"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
