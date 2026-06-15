"use client";
import { useAuth } from "@/hooks/useAuth";
import { HostSidebar } from "@/components/layout/HostSidebar";
import { Spinner } from "@/components/ui/Spinner";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { loading } = useAuth(true);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0FDFF]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F0FDFF]">
      <HostSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
