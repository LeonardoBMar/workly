'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  emptyMessage?: string;
}

type SortDirection = 'asc' | 'desc';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  pageSize = 10,
  emptyMessage = 'Nenhum dado encontrado',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>('desc');
  const [page, setPage] = useState(0);
  const isMobile = useIsMobile();

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      let cmp = 0;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        cmp = aVal - bVal;
      } else {
        cmp = String(aVal).localeCompare(String(bVal), 'pt-BR');
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
    setPage(0);
  };

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center sm:p-12">
        <p className="text-sm text-slate-400">{emptyMessage}</p>
      </div>
    );
  }

  const Pagination = () =>
    totalPages > 1 ? (
      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
        <span className="text-[11px] text-slate-400">
          {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)}{' '}
          de {sorted.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-2 text-xs font-medium text-slate-600">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    ) : null;

  // ─── Mobile Card View ───────────────────────────────────────
  if (isMobile) {
    return (
      <div className="space-y-3">
        {/* Sort selector for mobile */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Ordenar:
          </span>
          <select
            value={sortKey ?? ''}
            onChange={(e) => {
              const key = e.target.value || null;
              setSortKey(key);
              setPage(0);
            }}
            className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-600 outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">Padrão</option>
            {columns
              .filter((c) => c.sortable)
              .map((c) => (
                <option key={c.key} value={c.key}>
                  {c.header}
                </option>
              ))}
          </select>
          {sortKey && (
            <button
              onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
              className="rounded-md border border-slate-200 bg-white p-1.5 text-slate-500 transition-colors hover:bg-slate-50"
            >
              {sortDir === 'asc' ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>

        {/* Card list */}
        <div className="space-y-2.5">
          {paginated.map((row, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm"
            >
              {/* First column as card header */}
              <div className="mb-2 border-b border-slate-100 pb-2">
                <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                  {columns[0].header}
                </span>
                <div className="mt-0.5 text-sm font-semibold text-slate-900">
                  {columns[0].render
                    ? columns[0].render(row)
                    : String(row[columns[0].key] ?? '-')}
                </div>
              </div>
              {/* Remaining columns as rows */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {columns.slice(1).map((col) => (
                  <div key={col.key}>
                    <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                      {col.header}
                    </span>
                    <div className="mt-0.5 text-xs text-slate-700">
                      {col.render
                        ? col.render(row)
                        : String(row[col.key] ?? '-')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <Pagination />
        </div>
      </div>
    );
  }

  // ─── Desktop Table View ─────────────────────────────────────
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-[11px] font-semibold tracking-wider text-slate-500 uppercase',
                    col.sortable &&
                      'cursor-pointer select-none hover:text-slate-700',
                    col.className,
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable &&
                      sortKey === col.key &&
                      (sortDir === 'asc' ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr
                key={i}
                className="border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/50"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-4 py-3 text-xs whitespace-nowrap text-slate-700',
                      col.className,
                    )}
                  >
                    {col.render ? col.render(row) : String(row[col.key] ?? '-')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
}
