"use client";

import { AuthProvider } from "@/contexts/AuthContext";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
        {children}
      </div>
    </AuthProvider>
  );
}
