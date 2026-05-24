"use client";

import { Sidebar } from "@/components/admin/Sidebar";
import { Navbar } from "@/components/admin/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden md:ml-64">
        <Navbar />
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          {isLoading && (
            <div className="sticky top-0 z-20 flex items-center gap-2 border-b border-slate-200 bg-amber-50 px-4 py-2 text-sm text-amber-900">
              <Loader2 className="h-4 w-4 animate-spin" />
              Validando sessão em segundo plano...
            </div>
          )}
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
