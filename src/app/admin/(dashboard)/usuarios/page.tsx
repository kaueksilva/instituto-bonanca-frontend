"use client";

import { useState, useEffect } from "react";
import { AdminUser } from "@/types/admin";
import { userService } from "@/services/user.service";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Plus, Search, Edit2, Trash2 } from "lucide-react";

export default function UsuariosPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await userService.list(1, 50, search);
      setUsers(data.users);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  if (currentUser?.cargo !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold text-slate-800">Acesso Negado</h2>
        <p className="text-slate-500 mt-2">Apenas administradores podem acessar esta página.</p>
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await userService.delete(id);
        loadUsers();
      } catch (error: unknown) {
        // @ts-expect-error: response typing varies
        alert(error.response?.data?.message || "Erro ao excluir usuário");
      }
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Usuários do Sistema</h1>
          <p className="mt-2 text-sm text-slate-700">
            Gerencie quem tem acesso ao painel administrativo.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-none text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Novo Usuário
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-none leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out"
              placeholder="Buscar por nome ou e-mail..."
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Cargo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Criado em
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-500">
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-none bg-slate-100 flex items-center justify-center text-slate-600 font-semibold border border-slate-200">
                              {user.nome.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">{user.nome}</div>
                            <div className="text-sm text-slate-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-none bg-blue-100 text-blue-800 capitalize">
                          {user.cargo}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-none ${
                          user.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary hover:text-primary/80 mr-4">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        {currentUser.id !== user.id && (
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDelete(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
