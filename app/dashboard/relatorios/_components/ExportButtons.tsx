'use client';

import { useState } from 'react';
import { FileSpreadsheet, FileText, FileDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExportButtonsProps {
  onExportCSV: () => void;
  onExportXLSX: () => void;
  onExportPDF: () => void;
}

const buttons = [
  {
    key: 'csv',
    label: 'CSV',
    icon: FileText,
    color:
      'hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50',
  },
  {
    key: 'xlsx',
    label: 'Excel',
    icon: FileSpreadsheet,
    color: 'hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50',
  },
  {
    key: 'pdf',
    label: 'PDF',
    icon: FileDown,
    color: 'hover:border-red-300 hover:text-red-700 hover:bg-red-50',
  },
];

export function ExportButtons({
  onExportCSV,
  onExportXLSX,
  onExportPDF,
}: ExportButtonsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handlers: Record<string, () => void> = {
    csv: onExportCSV,
    xlsx: onExportXLSX,
    pdf: onExportPDF,
  };

  const handleClick = async (key: string) => {
    setLoading(key);
    try {
      await Promise.resolve(handlers[key]());
    } finally {
      setTimeout(() => setLoading(null), 500);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-full text-[10px] font-semibold tracking-wider text-slate-400 uppercase sm:w-auto">
        Exportar
      </span>
      {buttons.map((b) => (
        <button
          key={b.key}
          onClick={() => handleClick(b.key)}
          disabled={loading !== null}
          className={cn(
            'flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium whitespace-nowrap text-slate-600 shadow-sm transition-all sm:flex-none',
            b.color,
            loading === b.key && 'pointer-events-none opacity-60',
          )}
        >
          {loading === b.key ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <b.icon className="h-3.5 w-3.5 shrink-0" />
          )}
          {b.label}
        </button>
      ))}
    </div>
  );
}
