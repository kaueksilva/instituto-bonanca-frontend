"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      setError("");
      await login({ email: data.email, senha: data.senha });
    } catch (err: unknown) {
      setError(
        // @ts-expect-error: error typing from axios varies
        err.response?.data?.message || "Erro ao conectar. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-none shadow-xl overflow-hidden border border-slate-200">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center">
              <span className="text-3xl font-serif text-primary">IB</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-center text-slate-800 mb-2">
            Painel Administrativo
          </h2>
          <p className="text-center text-slate-500 mb-8 text-sm">
            Faça login para acessar o sistema
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 mb-6 text-sm border border-red-100 flex items-center">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-primary"
                  } rounded-none shadow-sm focus:outline-none focus:ring-1 sm:text-sm transition-colors`}
                  placeholder="admin@bonancainstituto.com.br"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("senha")}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.senha ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-primary"
                  } rounded-none shadow-sm focus:outline-none focus:ring-1 sm:text-sm transition-colors pr-10`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-slate-700"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.senha && (
                <p className="mt-1 text-xs text-red-500">{errors.senha.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-none shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </div>
        <div className="bg-slate-50 py-4 px-8 border-t border-slate-100">
          <p className="text-xs text-center text-slate-500">
            &copy; {new Date().getFullYear()} Instituto Bonança. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
