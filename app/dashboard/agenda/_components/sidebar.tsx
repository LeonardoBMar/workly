import { CalendarDays, Clock, Users, Plus } from "lucide-react"
import type { Booking } from "../types"
import type { Service } from "../_actions"

interface SidebarProps {
    bookings: Booking[]
    services: Service[]
    onNewBooking: () => void
    isLoading?: boolean
}

export function Sidebar({ bookings, services, onNewBooking, isLoading }: SidebarProps) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayBookings = bookings.filter((b) => {
        const bookingDate = new Date(b.start)
        bookingDate.setHours(0, 0, 0, 0)
        return bookingDate.getTime() === today.getTime()
    })

    const upcomingBookings = bookings
        .filter((b) => new Date(b.start) > new Date())
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
        .slice(0, 5)

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("pt-BR", {
            weekday: "short",
            day: "numeric",
            month: "short",
        })
    }

    const SERVICE_COLORS = [
        "#10b981", // Emerald
        "#3b82f6", // Blue
        "#8b5cf6", // Violet
        "#f59e0b", // Amber
        "#ec4899", // Pink
        "#06b6d4", // Cyan
        "#84cc16", // Lime
    ]

    const getServiceColor = (serviceId: string) => {
        const index = services.findIndex(s => s.id === serviceId)
        if (index === -1) return "#10b981"
        return SERVICE_COLORS[index % SERVICE_COLORS.length]
    }

    const getServiceInfo = (serviceId: string) => {
        return services.find(s => s.id === serviceId) || { name: 'Serviço' }
    }

    if (isLoading) {
        return (
            <aside className="w-72 bg-card border-r border-border p-4 flex flex-col h-full">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-secondary rounded w-1/2"></div>
                    <div className="h-10 bg-secondary rounded w-full"></div>
                    <div className="space-y-2">
                        <div className="h-24 bg-secondary rounded w-full"></div>
                        <div className="h-24 bg-secondary rounded w-full"></div>
                    </div>
                </div>
            </aside>
        )
    }

    return (
        <aside className="w-72 bg-card border-r border-border p-4 flex flex-col h-full">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <CalendarDays className="w-6 h-6 text-primary" />
                    Agenda
                </h1>
                <p className="text-sm text-muted-foreground mt-1">Gerencie seus agendamentos</p>
            </div>

            <button
                onClick={onNewBooking}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium mb-6"
            >
                <Plus className="w-5 h-5" />
                Novo Agendamento
            </button>

            <div className="mb-6">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Hoje ({todayBookings.length})
                </h2>
                {todayBookings.length > 0 ? (
                    <div className="space-y-2">
                        {todayBookings.map((booking) => {
                            const service = getServiceInfo(booking.serviceId)
                            const color = getServiceColor(booking.serviceId)

                            return (
                                <div
                                    key={booking.id}
                                    className="p-3 rounded-lg border border-border bg-secondary/30"
                                >
                                    <div className="flex items-start gap-2">
                                        <div
                                            className="w-1 h-full min-h-[40px] rounded-full"
                                            style={{ backgroundColor: color }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">
                                                {booking.clientName || "Cliente"}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatTime(booking.start)} - {formatTime(booking.end)}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{service.name}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Nenhum agendamento hoje</p>
                )}
            </div>

            <div className="flex-1 min-h-0">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Próximos
                </h2>
                {upcomingBookings.length > 0 ? (
                    <div className="space-y-2 overflow-y-auto max-h-[200px]">
                        {upcomingBookings.map((booking) => {
                            const service = getServiceInfo(booking.serviceId)
                            const color = getServiceColor(booking.serviceId)

                            return (
                                <div
                                    key={booking.id}
                                    className="p-2 rounded-lg bg-secondary/30 border border-border"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: color }}
                                        />
                                        <span className="text-xs text-muted-foreground">{formatDate(booking.start)}</span>
                                        <span className="text-xs text-muted-foreground">{formatTime(booking.start)}</span>
                                    </div>
                                    <p className="text-sm text-foreground truncate mt-1">
                                        {booking.clientName || "Cliente"}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Nenhum agendamento futuro</p>
                )}
            </div>

            <div className="mt-auto pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-lg bg-secondary/50">
                        <p className="text-2xl font-bold text-foreground">{todayBookings.length}</p>
                        <p className="text-xs text-muted-foreground">Hoje</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                        <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                        <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
