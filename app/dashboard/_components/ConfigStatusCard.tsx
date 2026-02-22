import { Check } from 'lucide-react';
import { ConfigStatus } from '../_types';

interface ConfigStatusCardProps {
  status: ConfigStatus;
}

export function ConfigStatusCard({ status }: ConfigStatusCardProps) {
  const configSteps = [
    { id: 1, name: 'Criar conta', completed: status.hasAccount },
    {
      id: 2,
      name: 'Configurar perfil',
      completed: status.hasProfile,
    },
    {
      id: 3,
      name: 'Cadastrar primeiro serviço',
      completed: status.hasServices,
    },
    {
      id: 4,
      name: 'Acessar agenda',
      completed: status.hasConnectedCalendar,
    },
  ];
  const completedSteps = configSteps.filter((s) => s.completed).length;

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Configuração</h3>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600">
          {completedSteps}/4
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {configSteps.map((step) => (
          <div key={step.id} className="flex items-center gap-3">
            {step.completed ? (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check className="h-3 w-3" />
              </div>
            ) : (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              </div>
            )}
            <span
              className={`text-sm ${
                step.completed ? 'text-slate-600' : 'font-medium text-slate-500'
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
