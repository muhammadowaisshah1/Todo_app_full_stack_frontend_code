# Frontend Guidelines - Todo App (Next.js 16+)

## Technology Stack
- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4.x
- **UI Components**: shadcn/ui
- **Forms**: react-hook-form + zod
- **State Management**: React Context (auth) + SWR (server state)
- **Auth**: Better Auth with JWT plugin

## Project Structure
```
src/
├── app/                    # App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Landing page
│   ├── (auth)/             # Auth route group
│   │   ├── signin/page.tsx
│   │   └── signup/page.tsx
│   └── dashboard/          # Protected routes
│       ├── layout.tsx      # Dashboard layout
│       └── page.tsx        # Task dashboard
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── auth/               # Auth forms
│   ├── tasks/              # Task components
│   └── layout/             # Layout components
├── lib/
│   ├── auth.ts             # Better Auth config
│   ├── api.ts              # API client with auth headers
│   └── utils.ts            # Utility functions
└── hooks/
    ├── use-auth.ts         # Auth context and hook
    └── use-tasks.ts        # SWR task hook
```

## Component Patterns

### Server vs Client Components
- **Server Components** (default): Layout, static content, data fetching containers
- **Client Components** (`"use client"`): Forms, toggles, modals, anything with useState/useEffect

### File Naming
- Components: `PascalCase.tsx` (e.g., `TaskItem.tsx`)
- Hooks: `use-kebab-case.ts` (e.g., `use-auth.ts`)
- Utils: `kebab-case.ts` (e.g., `api.ts`)

## API Integration

### API Client Pattern
```typescript
// lib/api.ts
const api = {
  async get<T>(path: string): Promise<T> {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new APIError(res);
    return res.json();
  }
};
```

### SWR Pattern
```typescript
// hooks/use-tasks.ts
export function useTasks(userId: string, filter?: string) {
  const { data, error, mutate } = useSWR(
    userId ? `/api/${userId}/tasks${filter ? `?status=${filter}` : ''}` : null,
    fetcher
  );
  return { tasks: data, isLoading: !error && !data, mutate };
}
```

## Authentication Flow
1. User signs up/in via Better Auth forms
2. Better Auth stores JWT in httpOnly cookie
3. API client extracts token and adds to Authorization header
4. Backend verifies JWT using shared BETTER_AUTH_SECRET

## Form Patterns

### Using react-hook-form + zod
```typescript
const schema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional()
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
```

## Styling Guidelines
- Use Tailwind utility classes
- Mobile-first responsive design (sm: md: lg:)
- Use shadcn/ui components for consistency
- Avoid inline styles

## Error Handling
- API errors: Show toast notifications
- Form errors: Display inline with react-hook-form
- 401 errors: Redirect to signin page
- Network errors: Show retry option

## Performance
- Use Server Components where possible
- Implement loading.tsx for streaming
- Add loading skeletons for data fetches
- Use optimistic updates for mutations

## Accessibility
- All interactive elements must be keyboard accessible
- Use proper ARIA labels
- Ensure 4.5:1 color contrast ratio
- Test with screen readers
