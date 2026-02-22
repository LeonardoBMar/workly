import { ElementType } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ElementType;
  action?: React.ReactNode;
  footerText?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  action,
  footerText = 'Este Mês',
}: StatCardProps) {
  return (
    <div className="dashboard-card-hover flex flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-slate-500 uppercase">
          {title} <Icon className="h-3 w-3 text-slate-400" />
        </div>
        {action}
      </div>
      <div className="mt-6">
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="mt-1 text-xs text-slate-500">{subtitle}</div>
      </div>
      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between border-t border-slate-50 pt-4 text-[10px] font-medium text-slate-400">
          <span>{footerText}</span>
        </div>
      </div>
    </div>
  );
}
