import Link from 'next/link';
import { CalendarClock, UserPlus, PlusCircle, Settings } from 'lucide-react';

export function QuickActionsGrid() {
  const actions = [
    { href: '/dashboard/agenda', icon: CalendarClock, label: 'Agenda' },
    { href: '/dashboard/clientes', icon: UserPlus, label: 'Clientes' },
    { href: '/dashboard/servicos', icon: PlusCircle, label: 'Serviços' },
    { href: '/dashboard/link', icon: Settings, label: 'Página Pública' },
  ];

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <h3 className="text-sm font-semibold text-slate-900">Ações Rápidas</h3>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {actions.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50/50 p-3 transition-colors hover:bg-slate-100"
          >
            <Icon className="mb-2 h-5 w-5 text-indigo-600" />
            <span className="text-center text-[10px] font-medium text-slate-600">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
