import { Users, FileText, Activity, CreditCard } from "lucide-react";

const stats = [
  { name: 'Total de Usuários', stat: '12', icon: Users, change: '+2', changeType: 'increase' },
  { name: 'Artigos Publicados', stat: '45', icon: FileText, change: '+5', changeType: 'increase' },
  { name: 'Acessos Hoje', stat: '342', icon: Activity, change: '-12', changeType: 'decrease' },
  { name: 'Assinaturas Ativas', stat: '0', icon: CreditCard, change: '0', changeType: 'neutral' },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Visão Geral</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow-sm border border-slate-200 overflow-hidden"
          >
            <dt>
              <div className="absolute bg-primary/10 rounded-none p-3">
                <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-slate-500 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-2 flex items-baseline sm:pb-3">
              <p className="text-2xl font-semibold text-slate-900">{item.stat}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'increase' ? 'text-green-600' : 
                  item.changeType === 'decrease' ? 'text-red-600' : 'text-slate-500'
                }`}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Placeholder for future charts or tables */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg leading-6 font-medium text-slate-900 mb-4">Atividade Recente</h3>
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-slate-200 text-slate-400">
            Gráfico de acessos em breve
          </div>
        </div>
        <div className="bg-white shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg leading-6 font-medium text-slate-900 mb-4">Ações Rápidas</h3>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 border border-slate-200 hover:border-primary hover:bg-primary/5 transition-colors flex items-center">
              <FileText className="h-5 w-5 text-slate-400 mr-3" />
              <span className="text-sm font-medium text-slate-700">Novo Artigo</span>
            </button>
            <button className="w-full text-left px-4 py-3 border border-slate-200 hover:border-primary hover:bg-primary/5 transition-colors flex items-center">
              <Users className="h-5 w-5 text-slate-400 mr-3" />
              <span className="text-sm font-medium text-slate-700">Adicionar Usuário</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
