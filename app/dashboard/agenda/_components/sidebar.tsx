import { Clock, Users, Plus, CalendarDays } from 'lucide-react';
import type { Booking } from '../types';
import type { Service } from '../_actions';

interface AgendaHeaderProps {
  bookings: Booking[];
  onNewBooking: () => void;
  isLoading?: boolean;
}

const SERVICE_COLORS = [
  '#10b981',
  '#3b82f6',
  '#8b5cf6',
  '#f59e0b',
  '#ec4899',
  '#06b6d4',
  '#84cc16',
];

export function AgendaHeader({
  bookings,
  onNewBooking,
  isLoading,
}: AgendaHeaderProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayCount = bookings.filter((b) => {
    const d = new Date(b.start);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  }).length;

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="bg-secondary h-10 w-48 animate-pulse rounded-lg"></div>
        <div className="bg-secondary h-10 w-24 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onNewBooking}
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
      >
        <Plus className="h-4 w-4" />
        Novo Agendamento
      </button>
      <div className="bg-secondary/50 flex items-center gap-2 rounded-lg px-3 py-2">
        <CalendarDays className="text-primary h-4 w-4" />
        <span className="text-foreground text-sm font-semibold">
          {todayCount}
        </span>
        <span className="text-muted-foreground text-xs">hoje</span>
      </div>
      <div className="bg-secondary/50 flex items-center gap-2 rounded-lg px-3 py-2">
        <Users className="text-primary h-4 w-4" />
        <span className="text-foreground text-sm font-semibold">
          {bookings.length}
        </span>
        <span className="text-muted-foreground text-xs">total</span>
      </div>
    </div>
  );
}

interface UpcomingPanelProps {
  bookings: Booking[];
  services: Service[];
  isLoading?: boolean;
}

export function UpcomingPanel({
  bookings,
  services,
  isLoading,
}: UpcomingPanelProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayBookings = bookings.filter((b) => {
    const bookingDate = new Date(b.start);
    bookingDate.setHours(0, 0, 0, 0);
    return bookingDate.getTime() === today.getTime();
  });

  const upcomingBookings = bookings
    .filter((b) => new Date(b.start) > new Date())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 8);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const getServiceColor = (serviceId: string) => {
    const index = services.findIndex((s) => s.id === serviceId);
    if (index === -1) return '#10b981';
    return SERVICE_COLORS[index % SERVICE_COLORS.length];
  };

  const getServiceInfo = (serviceId: string) => {
    return services.find((s) => s.id === serviceId) || { name: 'Serviço' };
  };

  if (isLoading) {
    return (
      <aside className="bg-card border-border flex h-full w-72 flex-col border-l p-4">
        <div className="animate-pulse space-y-3">
          <div className="bg-secondary h-6 w-2/3 rounded"></div>
          <div className="bg-secondary h-16 w-full rounded"></div>
          <div className="bg-secondary h-16 w-full rounded"></div>
          <div className="bg-secondary h-16 w-full rounded"></div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="bg-card border-border flex h-full w-72 min-w-[288px] flex-col border-l">
      <div className="border-border border-b p-4">
        <h2 className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
          <Clock className="h-3.5 w-3.5" />
          Hoje ({todayBookings.length})
        </h2>
        {todayBookings.length > 0 ? (
          <div className="space-y-1.5">
            {todayBookings.map((booking) => {
              const service = getServiceInfo(booking.serviceId);
              const color = getServiceColor(booking.serviceId);
              return (
                <div
                  key={booking.id}
                  className="border-border bg-secondary/30 rounded-lg border p-2"
                >
                  <div className="flex items-start gap-2">
                    <div
                      className="mt-0.5 h-8 w-1 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-foreground truncate text-sm font-medium">
                        {booking.clientName || 'Cliente'}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatTime(booking.start)} - {formatTime(booking.end)}{' '}
                        · {service.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-xs">
            Nenhum agendamento hoje
          </p>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4">
        <h2 className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
          <Users className="h-3.5 w-3.5" />
          Próximos
        </h2>
        {upcomingBookings.length > 0 ? (
          <div className="min-h-0 flex-1 space-y-1.5 overflow-y-auto">
            {upcomingBookings.map((booking) => {
              const color = getServiceColor(booking.serviceId);
              return (
                <div
                  key={booking.id}
                  className="bg-secondary/30 border-border rounded-lg border p-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-muted-foreground text-xs">
                      {formatDate(booking.start)}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {formatTime(booking.start)}
                    </span>
                  </div>
                  <p className="text-foreground mt-0.5 truncate text-sm">
                    {booking.clientName || 'Cliente'}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-xs">
            Nenhum agendamento futuro
          </p>
        )}
      </div>
    </aside>
  );
}
