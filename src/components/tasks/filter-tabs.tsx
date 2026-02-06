"use client";

import { cn } from "@/lib/utils";

type FilterValue = "all" | "pending" | "completed";

interface FilterTabsProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

const filters: { value: FilterValue; label: string; icon: string }[] = [
  { value: "all", label: "All", icon: "M4 6h16M4 12h16M4 18h16" },
  { value: "pending", label: "Pending", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { value: "completed", label: "Done", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
];

export function FilterTabs({ value, onChange }: FilterTabsProps) {
  return (
    <div className="inline-flex rounded-xl bg-muted/50 p-1 backdrop-blur-sm">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
            value === filter.value
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={filter.icon} />
          </svg>
          <span className="hidden sm:inline">{filter.label}</span>
        </button>
      ))}
    </div>
  );
}
