import { CalendarDays, Clock, Users, Plus } from 'lucide-react';
import type { Booking } from '../types';
import type { Service } from '../_actions';

interface SidebarProps {
  bookings: Booking[];
  services: Service[];
  onNewBooking: () => void;
  isLoading?: boolean;
}

export function Sidebar({
  bookings,
  services,
  onNewBooking,
  isLoading,
}: SidebarProps) {
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
    .slice(0, 5);

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

  const SERVICE_COLORS = [
    '#10b981', // Emerald
    '#3b82f6', // Blue
    '#8b5cf6', // Violet
    '#f59e0b', // Amber
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#84cc16', // Lime
  ];

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
      <aside className="bg-card border-border flex h-full w-72 flex-col border-r p-4">
        <div className="animate-pulse space-y-4">
          <div className="bg-secondary h-8 w-1/2 rounded"></div>
          <div className="bg-secondary h-10 w-full rounded"></div>
          <div className="space-y-2">
            <div className="bg-secondary h-24 w-full rounded"></div>
            <div className="bg-secondary h-24 w-full rounded"></div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="bg-card border-border flex h-full w-72 flex-col border-r p-4">
      <div className="mb-6">
        <h1 className="text-foreground flex items-center gap-2 text-xl font-bold">
          <CalendarDays className="text-primary h-6 w-6" />
          Agenda
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Gerencie seus agendamentos
        </p>
      </div>

      <button
        onClick={onNewBooking}
        className="bg-primary text-primary-foreground hover:bg-primary/90 mb-6 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors"
      >
        <Plus className="h-5 w-5" />
        Novo Agendamento
      </button>

      <div className="mb-6">
        <h2 className="text-muted-foreground mb-3 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
          <Clock className="h-4 w-4" />
          Hoje ({todayBookings.length})
        </h2>
        {todayBookings.length > 0 ? (
          <div className="space-y-2">
            {todayBookings.map((booking) => {
              const service = getServiceInfo(booking.serviceId);
              const color = getServiceColor(booking.serviceId);

              return (
                <div
                  key={booking.id}
                  className="border-border bg-secondary/30 rounded-lg border p-3"
                >
                  <div className="flex items-start gap-2">
                    <div
                      className="h-full min-h-[40px] w-1 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-foreground truncate text-sm font-medium">
                        {booking.clientName || 'Cliente'}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatTime(booking.start)} - {formatTime(booking.end)}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {service.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            Nenhum agendamento hoje
          </p>
        )}
      </div>

      <div className="min-h-0 flex-1">
        <h2 className="text-muted-foreground mb-3 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
          <Users className="h-4 w-4" />
          Próximos
        </h2>
        {upcomingBookings.length > 0 ? (
          <div className="max-h-[200px] space-y-2 overflow-y-auto">
            {upcomingBookings.map((booking) => {
              const service = getServiceInfo(booking.serviceId);
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
                  <p className="text-foreground mt-1 truncate text-sm">
                    {booking.clientName || 'Cliente'}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            Nenhum agendamento futuro
          </p>
        )}
      </div>

      <div className="border-border mt-auto border-t pt-4">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-foreground text-2xl font-bold">
              {todayBookings.length}
            </p>
            <p className="text-muted-foreground text-xs">Hoje</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-foreground text-2xl font-bold">
              {bookings.length}
            </p>
            <p className="text-muted-foreground text-xs">Total</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
