'use client';

import { useState, useCallback } from 'react';
import { BarChart3 } from 'lucide-react';
import type { ReportsData, ReportPeriod } from '../_types/reports';
import {
  useFilteredReportsData,
  useMonthlyRevenueChart,
} from '../_hooks/use-reports-data';
import {
  formatCurrency,
  formatDateTime,
  formatDate,
  getStatusLabel,
  getStatusColor,
} from '../_utils/report-formatters';
import { exportToCSV, exportToXLSX, exportToPDF } from '../_utils/export-utils';

import { PeriodSelector } from './PeriodSelector';
import { ReportsSummaryCards } from './ReportsSummaryCards';
import { RevenueBarChart } from './RevenueBarChart';
import { ServicePerformanceChart } from './ServicePerformanceChart';
import { DataTable, type Column } from './DataTable';
import { ExportButtons } from './ExportButtons';

import { cn } from '@/lib/utils';

type TabKey = 'appointments' | 'clients' | 'services';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'appointments', label: 'Agendamentos' },
  { key: 'clients', label: 'Clientes' },
  { key: 'services', label: 'Serviços' },
];

export function ReportsClient({ data }: { data: ReportsData }) {
  const [period, setPeriod] = useState<ReportPeriod>('6m');
  const [activeTab, setActiveTab] = useState<TabKey>('appointments');

  const filtered = useFilteredReportsData(data, period);
  const chartData = useMonthlyRevenueChart(filtered.monthlyRevenue);

  // ─── Column Definitions ─────────────────────────────────────
  const appointmentColumns: Column<Record<string, unknown>>[] = [
    { key: 'clientName', header: 'Cliente', sortable: true },
    { key: 'serviceName', header: 'Serviço', sortable: true },
    {
      key: 'servicePrice',
      header: 'Valor',
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-slate-900">
          {formatCurrency(row.servicePrice as number)}
        </span>
      ),
    },
    {
      key: 'startTime',
      header: 'Data/Hora',
      sortable: true,
      render: (row) => formatDateTime(row.startTime as string),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <span
          className={cn(
            'inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold',
            getStatusColor(row.status as string),
          )}
        >
          {getStatusLabel(row.status as string)}
        </span>
      ),
    },
  ];

  const clientColumns: Column<Record<string, unknown>>[] = [
    { key: 'name', header: 'Nome', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'phone', header: 'Telefone' },
    { key: 'totalAppointments', header: 'Agendamentos', sortable: true },
    {
      key: 'totalSpent',
      header: 'Total Gasto',
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-slate-900">
          {formatCurrency(row.totalSpent as number)}
        </span>
      ),
    },
    {
      key: 'lastVisit',
      header: 'Última Visita',
      sortable: true,
      render: (row) =>
        row.lastVisit ? formatDate(row.lastVisit as string) : '-',
    },
  ];

  const serviceColumns: Column<Record<string, unknown>>[] = [
    { key: 'name', header: 'Serviço', sortable: true },
    {
      key: 'price',
      header: 'Preço',
      sortable: true,
      render: (row) => formatCurrency(row.price as number),
    },
    {
      key: 'duration',
      header: 'Duração',
      render: (row) => `${row.duration} min`,
    },
    { key: 'totalAppointments', header: 'Agendamentos', sortable: true },
    {
      key: 'totalRevenue',
      header: 'Receita Total',
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-slate-900">
          {formatCurrency(row.totalRevenue as number)}
        </span>
      ),
    },
  ];

  // ─── Current Tab Data & Columns ──────────────────────────
  const currentData = {
    appointments: filtered.appointmentReports as unknown as Record<
      string,
      unknown
    >[],
    clients: filtered.clientReports as unknown as Record<string, unknown>[],
    services: filtered.serviceReports as unknown as Record<string, unknown>[],
  }[activeTab];

  const currentColumns = {
    appointments: appointmentColumns,
    clients: clientColumns,
    services: serviceColumns,
  }[activeTab];

  // ─── Export Columns (flat keys for export) ────────────────
  const exportColumnsMap: Record<TabKey, { key: string; header: string }[]> = {
    appointments: [
      { key: 'clientName', header: 'Cliente' },
      { key: 'clientEmail', header: 'Email' },
      { key: 'clientPhone', header: 'Telefone' },
      { key: 'serviceName', header: 'Serviço' },
      { key: 'servicePrice', header: 'Valor (R$)' },
      { key: 'startTime', header: 'Data/Hora Início' },
      { key: 'endTime', header: 'Data/Hora Fim' },
      { key: 'status', header: 'Status' },
      { key: 'notes', header: 'Observações' },
    ],
    clients: [
      { key: 'name', header: 'Nome' },
      { key: 'email', header: 'Email' },
      { key: 'phone', header: 'Telefone' },
      { key: 'totalAppointments', header: 'Total Agendamentos' },
      { key: 'totalSpent', header: 'Total Gasto (R$)' },
      { key: 'lastVisit', header: 'Última Visita' },
      { key: 'createdAt', header: 'Cadastrado Em' },
    ],
    services: [
      { key: 'name', header: 'Serviço' },
      { key: 'description', header: 'Descrição' },
      { key: 'price', header: 'Preço (R$)' },
      { key: 'duration', header: 'Duração (min)' },
      { key: 'totalAppointments', header: 'Total Agendamentos' },
      { key: 'totalRevenue', header: 'Receita Total (R$)' },
    ],
  };

  const tabLabels: Record<TabKey, string> = {
    appointments: 'Agendamentos',
    clients: 'Clientes',
    services: 'Serviços',
  };

  // ─── Export Handlers ──────────────────────────────────────
  const getExportData = useCallback(() => {
    // Prepare export-ready data with formatted dates/status
    return currentData.map((row) => {
      const formatted = { ...row };
      if (formatted.startTime)
        formatted.startTime = formatDateTime(formatted.startTime as string);
      if (formatted.endTime)
        formatted.endTime = formatDateTime(formatted.endTime as string);
      if (formatted.lastVisit && formatted.lastVisit !== '-')
        formatted.lastVisit = formatDate(formatted.lastVisit as string);
      if (formatted.createdAt)
        formatted.createdAt = formatDate(formatted.createdAt as string);
      if (formatted.status)
        formatted.status = getStatusLabel(formatted.status as string);
      return formatted;
    });
  }, [currentData]);

  const handleExportCSV = useCallback(() => {
    exportToCSV(
      getExportData(),
      exportColumnsMap[activeTab],
      `relatorio_${activeTab}`,
    );
  }, [getExportData, activeTab]);

  const handleExportXLSX = useCallback(() => {
    exportToXLSX(
      getExportData(),
      exportColumnsMap[activeTab],
      `relatorio_${activeTab}`,
      tabLabels[activeTab],
    );
  }, [getExportData, activeTab]);

  const handleExportPDF = useCallback(() => {
    exportToPDF(
      getExportData(),
      exportColumnsMap[activeTab],
      `Relatório de ${tabLabels[activeTab]}`,
      `relatorio_${activeTab}`,
    );
  }, [getExportData, activeTab]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4 duration-700 sm:space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-indigo-50 p-2">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Relatórios
            </h1>
            <p className="text-xs text-slate-400">
              Análise financeira e de performance
            </p>
          </div>
        </div>
        <PeriodSelector value={period} onChange={setPeriod} />
      </header>

      {/* Summary Cards */}
      <ReportsSummaryCards
        totalRevenue={filtered.totals.totalRevenue}
        totalAppointments={filtered.totals.totalAppointments}
        avgTicket={filtered.totals.avgTicket}
        totalClients={filtered.totals.totalClients}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RevenueBarChart data={chartData} />
        <ServicePerformanceChart data={filtered.servicePerformance} />
      </div>

      {/* Data Tables */}
      <section className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Tabs */}
          <div className="scrollbar-hide flex w-full flex-nowrap items-center gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-1 lg:w-auto">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={cn(
                  'rounded-md px-3 py-2 text-xs font-medium whitespace-nowrap transition-all sm:py-1.5',
                  activeTab === t.key
                    ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-500 hover:text-slate-700',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Export */}
          <ExportButtons
            onExportCSV={handleExportCSV}
            onExportXLSX={handleExportXLSX}
            onExportPDF={handleExportPDF}
          />
        </div>

        <DataTable
          data={currentData}
          columns={currentColumns}
          emptyMessage={`Nenhum dado de ${tabLabels[activeTab].toLowerCase()} encontrado`}
        />
      </section>
    </div>
  );
}
