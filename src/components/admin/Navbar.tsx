"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Menu, Bell, LogOut } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-slate-200">
      <button
        type="button"
        className="px-4 border-r border-slate-200 text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
      
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <h1 className="text-lg font-semibold text-slate-800 hidden sm:block">
            Painel de Controle
          </h1>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            className="bg-white p-1 rounded-none text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={logout}
            className="ml-3 inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>

          {/* Profile dropdown stub */}
          <div className="ml-3 relative flex items-center gap-3 border-l border-slate-200 pl-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-700">{user?.nome}</p>
              <p className="text-xs text-slate-500 capitalize">{user?.cargo}</p>
            </div>
            <div className="h-8 w-8 rounded-none bg-primary flex items-center justify-center text-white text-sm font-bold">
              {user?.nome?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
