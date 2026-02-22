import { ExternalLink, MoreHorizontal, CalendarClock } from 'lucide-react';
import { Appointment } from '../_types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RecentAppointmentsCardProps {
  appointments: Appointment[];
}

export function RecentAppointmentsCard({
  appointments,
}: RecentAppointmentsCardProps) {
  return (
    <div className="dashboard-card-hover rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-slate-900 uppercase">
          Agendamentos recentes{' '}
          <ExternalLink className="h-3 w-3 text-slate-400" />
        </div>
        <MoreHorizontal className="h-4 w-4 text-slate-400" />
      </div>
      <div className="mt-8 space-y-4">
        {appointments?.length > 0 ? (
          appointments.map((apt) => (
            <div
              key={apt.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-indigo-50 p-2 text-indigo-600">
                  <CalendarClock className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {apt.client?.name || 'Cliente'}
                  </p>
                  <p className="text-xs text-slate-500">{apt.service?.name}</p>
                </div>
              </div>
              <div className="text-right font-medium whitespace-nowrap text-slate-700">
                {format(new Date(apt.startTime), "d 'de' MMM, HH:mm", {
                  locale: ptBR,
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200 p-4 text-center">
            <p className="text-sm text-slate-500">
              Nenhum agendamento futuro no período.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
