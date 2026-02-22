'use client';

import {
  Home,
  Calendar,
  Users,
  Package,
  TrendingUp,
  Clock,
  BarChart3,
  ArrowUpRight,
} from 'lucide-react';

export function DashboardMockup() {
  return (
    <div className="relative flex h-[500px] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 shadow-2xl select-none sm:h-[600px] sm:rounded-3xl">
      {/* Top Header Mockup */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-600 sm:hidden">
            <span className="text-[10px] font-bold text-white uppercase">
              W
            </span>
          </div>
          <div className="hidden h-6 w-6 items-center justify-center rounded bg-indigo-600 sm:flex">
            <span className="text-[8px] font-bold text-white uppercase">W</span>
          </div>
          <span className="hidden font-bold tracking-tight text-slate-900 sm:block">
            workly
          </span>
          <span className="hidden text-slate-300 sm:block">/</span>
          <span className="text-xs font-semibold text-slate-900 sm:text-sm">
            Visão Geral
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full border border-slate-200 bg-slate-100"></div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Slim Sidebar (Desktop only inside the mockup) */}
        <div className="hidden w-16 shrink-0 flex-col items-center border-r border-slate-200 bg-white py-4 sm:flex">
          <div className="flex flex-col gap-4">
            <NavItem icon={Home} active />
            <NavItem icon={Calendar} />
            <NavItem icon={Users} />
            <NavItem icon={Package} />
          </div>
        </div>

        {/* Main Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:p-6 [&::-webkit-scrollbar]:hidden">
          {/* Stats Grid */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4">
            <StatCard
              title="Receita Mensal"
              value="R$ 12.450"
              trend="+12.5%"
              icon={TrendingUp}
              color="text-emerald-600"
              bg="bg-emerald-50"
              className="col-span-2"
            />
            <StatCard
              title="Agendamentos"
              value="42"
              trend="+4"
              icon={Calendar}
              color="text-indigo-600"
              bg="bg-indigo-50"
            />
            <StatCard
              title="Clientes"
              value="18"
              trend="+8%"
              icon={Users}
              color="text-purple-600"
              bg="bg-purple-50"
            />
          </div>

          {/* Cards Grid stacked universally */}
          <div className="grid grid-cols-1 gap-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Atividade</h3>
                <BarChart3 className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex h-32 items-end justify-between gap-1.5 px-1 sm:h-40 sm:gap-3 sm:px-2">
                {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
                  <div
                    key={i}
                    className="group/bar flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className="relative w-full overflow-hidden rounded-t-sm bg-indigo-50 transition-all group-hover/bar:bg-indigo-500 sm:rounded-t-md"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-indigo-200/50 to-transparent"></div>
                    </div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase transition-colors group-hover/bar:text-indigo-600 sm:text-[10px]">
                      {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Próximos Clientes
                </h3>
                <button className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700">
                  Ver todos
                </button>
              </div>
              <div className="space-y-3">
                <AppointmentItem
                  name="Ana Beatriz"
                  service="Consultoria"
                  time="14:30"
                  status="Confirmado"
                />
                <AppointmentItem
                  name="Lucas Oliveira"
                  service="Design Review"
                  time="16:00"
                  status="Pendente"
                />
                <AppointmentItem
                  name="Mariana Silva"
                  service="Mentoria"
                  time="17:30"
                  status="Confirmado"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, active = false }: any) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
        active
          ? 'bg-indigo-50 text-indigo-600 shadow-sm'
          : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
      }`}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
}

function StatCard({
  title,
  value,
  trend,
  icon: Icon,
  color,
  bg,
  className,
}: any) {
  return (
    <div
      className={`rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all sm:p-5 ${className || ''}`}
    >
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <div className={`rounded-xl p-2 ${bg} ${color}`}>
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 sm:gap-1 sm:px-2 sm:py-1">
          <ArrowUpRight className="h-3 w-3" />
          {trend}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-medium tracking-wider text-slate-500 uppercase sm:text-xs">
          {title}
        </p>
        <p className="mt-1 text-lg font-bold text-slate-900 sm:text-2xl">
          {value}
        </p>
      </div>
    </div>
  );
}

function AppointmentItem({ name, service, time, status }: any) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-50 bg-slate-50/50 p-3 transition-colors hover:border-slate-100 hover:bg-slate-50">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-400 uppercase shadow-sm sm:h-10 sm:w-10 sm:text-xs">
          {name
            .split(' ')
            .map((n: string) => n[0])
            .join('')}
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900 sm:text-sm">{name}</p>
          <p className="text-[9px] font-medium text-slate-500 sm:text-[10px]">
            {service}
          </p>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center justify-end gap-1 text-[9px] font-bold text-slate-700 sm:text-[10px]">
          <Clock className="h-3 w-3 text-slate-400" />
          {time}
        </div>
        <div
          className={`mt-0.5 text-[9px] font-bold sm:mt-1 sm:text-[10px] ${
            status === 'Confirmado' ? 'text-emerald-600' : 'text-amber-600'
          }`}
        >
          {status}
        </div>
      </div>
    </div>
  );
}
