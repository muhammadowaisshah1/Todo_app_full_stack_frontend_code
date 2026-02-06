"use client";

interface EmptyStateProps {
  filter?: string;
}

export function EmptyState({ filter }: EmptyStateProps) {
  const getContent = () => {
    switch (filter) {
      case "pending":
        return {
          icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          title: "All caught up!",
          message: "No pending tasks. Great job staying on top of things!",
          color: "emerald"
        };
      case "completed":
        return {
          icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
          title: "Nothing completed yet",
          message: "Start checking off your tasks to see them here.",
          color: "amber"
        };
      default:
        return {
          icon: "M12 4v16m8-8H4",
          title: "No tasks yet",
          message: "Create your first task to get started on your journey!",
          color: "primary"
        };
    }
  };

  const content = getContent();

  return (
    <div className="rounded-2xl border-2 border-dashed border-muted-foreground/20 bg-card/30 p-12 text-center backdrop-blur-sm">
      <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
        content.color === "emerald" ? "bg-emerald-500/10 text-emerald-600" :
        content.color === "amber" ? "bg-amber-500/10 text-amber-600" :
        "bg-primary/10 text-primary"
      }`}>
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={content.icon} />
        </svg>
      </div>
      <h3 className="mb-2 text-lg font-semibold">{content.title}</h3>
      <p className="text-muted-foreground">{content.message}</p>
    </div>
  );
}
