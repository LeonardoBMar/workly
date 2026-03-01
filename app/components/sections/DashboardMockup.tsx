'use client';

export default function DashboardMockup() {
  return (
    <div className="hero-mockup relative w-full">
      {/* This div has actual dimensions via padding-bottom → hover works */}
      <div
        className="mockup-container relative w-full"
        style={{ paddingBottom: '85%' }}
      >
        {/* ── Back screen: Clients ── */}
        <div
          className="mockup-card mockup-card--back absolute inset-0 origin-center overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-lg transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: '88%', height: '88%' }}
        >
          <ClientsScreen />
        </div>

        {/* ── Middle screen: Agenda ── */}
        <div
          className="mockup-card mockup-card--middle absolute inset-0 origin-center overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: '88%', height: '88%' }}
        >
          <AgendaScreen />
        </div>

        {/* ── Front screen: Dashboard ── */}
        <div
          className="mockup-card mockup-card--front absolute inset-0 origin-center overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: '88%', height: '88%' }}
        >
          <DashboardScreen />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Miniature screen mockups — pure decorative UI
   ════════════════════════════════════════════════════════ */

function ScreenHeader({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
      <div className={`h-2.5 w-2.5 rounded-full ${accent}`} />
      <span className="text-[10px] font-semibold tracking-wide text-slate-700 uppercase">
        {title}
      </span>
      <div className="ml-auto flex gap-1">
        <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
        <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
        <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

/* ── Dashboard screen ── */
function DashboardScreen() {
  return (
    <div className="flex h-full flex-col rounded-xl">
      <ScreenHeader title="Dashboard" accent="bg-indigo-500" />
      <div className="flex-1 space-y-3 p-4">
        {/* Stat cards row */}
        <div className="grid grid-cols-3 gap-2">
          <StatMini label="Receita" value="R$ 4.2k" color="bg-indigo-500" />
          <StatMini label="Clientes" value="128" color="bg-emerald-500" />
          <StatMini label="Agend." value="47" color="bg-amber-500" />
        </div>
        {/* Chart placeholder */}
        <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[8px] font-semibold text-slate-500">
              RECEITA MENSAL
            </span>
            <div className="flex gap-1">
              <div className="h-1 w-3 rounded-full bg-slate-200" />
              <div className="h-1 w-3 rounded-full bg-slate-200" />
            </div>
          </div>
          <ChartBars />
        </div>
        {/* Recent list */}
        <div className="space-y-1.5">
          <span className="text-[8px] font-semibold text-slate-500">
            RECENTES
          </span>
          <ListRow />
          <ListRow />
          <ListRow />
        </div>
      </div>
    </div>
  );
}

function StatMini({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-slate-100 bg-white p-2">
      <div className="flex items-center gap-1.5">
        <div className={`h-1.5 w-1.5 rounded-full ${color}`} />
        <span className="text-[7px] font-medium text-slate-400">{label}</span>
      </div>
      <span className="mt-0.5 block text-[11px] font-bold text-slate-800">
        {value}
      </span>
    </div>
  );
}

function ChartBars() {
  const heights = [40, 65, 50, 80, 60, 90, 75, 55, 85, 70, 95, 60];
  return (
    <div className="flex items-end gap-[3px]" style={{ height: 40 }}>
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm bg-indigo-400/70"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function ListRow() {
  return (
    <div className="flex items-center gap-2 rounded-md bg-slate-50/70 px-2 py-1.5">
      <div className="h-4 w-4 rounded-full bg-slate-200" />
      <div className="flex-1 space-y-0.5">
        <div className="h-1 w-3/4 rounded-full bg-slate-200" />
        <div className="h-1 w-1/2 rounded-full bg-slate-100" />
      </div>
      <div className="h-1 w-6 rounded-full bg-slate-200" />
    </div>
  );
}

/* ── Agenda screen ── */
function AgendaScreen() {
  return (
    <div className="flex h-full flex-col rounded-xl">
      <ScreenHeader title="Agenda" accent="bg-blue-500" />
      <div className="flex-1 p-4">
        <div className="space-y-1">
          {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'].map(
            (time, i) => (
              <div key={time} className="flex items-stretch gap-2">
                <span className="w-7 shrink-0 pt-0.5 text-right text-[7px] font-medium text-slate-400">
                  {time}
                </span>
                <div className="relative flex-1 border-t border-slate-100 py-1">
                  {i === 1 && (
                    <div className="rounded-md bg-blue-500/90 px-2 py-1">
                      <div className="h-1 w-3/4 rounded-full bg-white/80" />
                      <div className="mt-0.5 h-1 w-1/2 rounded-full bg-white/50" />
                    </div>
                  )}
                  {i === 3 && (
                    <div className="rounded-md bg-indigo-500/80 px-2 py-1">
                      <div className="h-1 w-2/3 rounded-full bg-white/80" />
                      <div className="mt-0.5 h-1 w-1/3 rounded-full bg-white/50" />
                    </div>
                  )}
                  {i === 4 && (
                    <div className="rounded-md bg-emerald-500/80 px-2 py-1">
                      <div className="h-1 w-1/2 rounded-full bg-white/80" />
                      <div className="mt-0.5 h-1 w-1/4 rounded-full bg-white/50" />
                    </div>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Clients screen ── */
function ClientsScreen() {
  return (
    <div className="flex h-full flex-col rounded-xl">
      <ScreenHeader title="Clientes" accent="bg-emerald-500" />
      <div className="flex-1 space-y-2 p-4">
        {/* Search bar */}
        <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/50 px-2 py-1.5">
          <div className="h-2 w-2 rounded-full bg-slate-300" />
          <div className="h-1 w-16 rounded-full bg-slate-200" />
        </div>
        {/* Client rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-slate-50 px-2 py-1.5"
          >
            <div className="h-5 w-5 rounded-full bg-linear-to-br from-slate-200 to-slate-300" />
            <div className="flex-1 space-y-0.5">
              <div
                className="h-1 rounded-full bg-slate-200"
                style={{ width: `${60 + i * 5}%` }}
              />
              <div
                className="h-1 rounded-full bg-slate-100"
                style={{ width: `${40 + i * 3}%` }}
              />
            </div>
            <div className="h-3 w-8 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
