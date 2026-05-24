"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  FileText
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Usuários", href: "/admin/usuarios", icon: Users, adminOnly: true },
    { name: "Artigos", href: "/admin/artigos", icon: FileText },
    { name: "Configurações", href: "/admin/configuracoes", icon: Settings },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-full fixed left-0 top-0 text-slate-300">
      <div className="flex items-center justify-center h-16 bg-slate-950 border-b border-slate-800">
        <span className="text-xl font-serif text-white font-semibold tracking-wide">I. Bonança</span>
      </div>
      
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="px-4 py-6">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Menu Principal
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => {
              if (item.adminOnly && user?.cargo !== 'admin') return null;
              
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-none transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="flex-shrink-0 flex border-t border-slate-800 p-4">
        <button
          onClick={logout}
          className="flex-shrink-0 w-full group block text-left"
        >
          <div className="flex items-center">
            <div>
              <div className="inline-block h-9 w-9 rounded-none bg-slate-800 items-center justify-center text-sm font-bold text-slate-300">
                {user?.nome.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white group-hover:text-slate-200">
                {user?.nome || "Usuário"}
              </p>
              <p className="text-xs font-medium text-slate-500 group-hover:text-slate-400 flex items-center">
                <LogOut className="h-3 w-3 mr-1" />
                Sair do sistema
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
