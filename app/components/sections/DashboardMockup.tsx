'use client';

import {
  Home,
  Calendar,
  Users,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  BarChart3,
  ArrowUpRight,
} from 'lucide-react';

export function DashboardMockup() {
  return (
    <div className="flex h-[600px] w-full overflow-hidden rounded-b-3xl bg-white text-slate-900 shadow-2xl select-none">
      <div className="hidden w-64 flex-col border-r border-slate-100 bg-slate-50/30 p-4 md:flex">
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600">
            <span className="text-[10px] font-bold text-white uppercase">
              W
            </span>
          </div>
          <span className="font-bold tracking-tight text-slate-900">
            workly
          </span>
        </div>

        <div className="space-y-1">
          <NavItem icon={Home} label="Início" active />
          <NavItem icon={Calendar} label="Agenda" />
          <NavItem icon={Users} label="Clientes" />
          <NavItem icon={Package} label="Serviços" />
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex h-16 items-center justify-between border-b border-slate-100 bg-white/50 px-8 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span>Dashboard</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900">Visão Geral</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full border border-slate-200 bg-slate-100"></div>
          </div>
        </div>

        <div className="overflow-hidden p-8">
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatCard
              title="Receita Mensal"
              value="R$ 12.450"
              trend="+12.5%"
              icon={TrendingUp}
              color="text-emerald-600"
              bg="bg-emerald-50"
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
              title="Novos Clientes"
              value="18"
              trend="+8%"
              icon={Users}
              color="text-purple-600"
              bg="bg-purple-50"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Atividade Semanal</h3>
                <BarChart3 className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex h-40 items-end justify-between gap-2 px-2">
                {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
                  <div
                    key={i}
                    className="group/bar flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className="relative w-full overflow-hidden rounded-t-lg bg-indigo-100 transition-all group-hover/bar:bg-indigo-500 group-hover/bar:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-indigo-200/50 to-transparent"></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase transition-colors group-hover/bar:text-indigo-600">
                      {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Próximos Clientes</h3>
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
                  Ver todos
                </button>
              </div>
              <div className="space-y-4">
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

function NavItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
        active
          ? 'bg-indigo-50 text-indigo-700'
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon
        className={`h-4 w-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`}
      />
      {label}
    </div>
  );
}

function StatCard({ title, value, trend, icon: Icon, color, bg }: any) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div className={`rounded-xl p-2 ${bg} ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
          <ArrowUpRight className="h-3 w-3" />
          {trend}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
          {title}
        </p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function AppointmentItem({ name, service, time, status }: any) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-transparent p-3 transition-colors hover:border-slate-100 hover:bg-slate-50">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-400 uppercase">
          {name
            .split(' ')
            .map((n: string) => n[0])
            .join('')}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{name}</p>
          <p className="text-[10px] text-slate-500">{service}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-900">
          <Clock className="h-3 w-3 text-slate-400" />
          {time}
        </div>
        <div
          className={`mt-1 text-[10px] font-bold ${
            status === 'Confirmado' ? 'text-emerald-600' : 'text-amber-600'
          }`}
        >
          {status}
        </div>
      </div>
    </div>
  );
}
