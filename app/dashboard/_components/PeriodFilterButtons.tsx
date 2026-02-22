import { Calendar } from 'lucide-react';
import { PeriodFilter } from '../_types';

interface PeriodFilterButtonsProps {
  periodFilter: PeriodFilter;
  onPeriodChange: (period: PeriodFilter) => void;
}

export function PeriodFilterButtons({
  periodFilter,
  onPeriodChange,
}: PeriodFilterButtonsProps) {
  return (
    <>
      <button
        onClick={() => onPeriodChange('7d')}
        className={`flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium shadow-sm transition-colors ${
          periodFilter === '7d'
            ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
        }`}
      >
        <Calendar className="h-3 w-3" />
        <span>Últimos 7 dias</span>
      </button>
      <button
        onClick={() => onPeriodChange('daily')}
        className={`flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium shadow-sm transition-colors ${
          periodFilter === 'daily'
            ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
        }`}
      >
        <span>Diário</span>
      </button>
    </>
  );
}
