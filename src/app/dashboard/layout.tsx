import { ReactNode } from "react";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Header } from "@/components/layout/header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col gradient-bg">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
