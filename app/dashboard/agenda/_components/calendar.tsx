"use client"

import { useRef, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import type { EventClickArg, DateSelectArg, EventDropArg } from "@fullcalendar/core"
import type { EventResizeDoneArg } from "@fullcalendar/interaction"
import ptBrLocale from "@fullcalendar/core/locales/pt-br"
import type { Booking } from "../types"
import type { Service } from "../_hooks"

interface CalendarProps {
    bookings: Booking[]
    services: Service[]
    onSelectSlot: (start: Date, end: Date) => void
    onEventClick: (booking: Booking) => void
    onEventDrop: (booking: Booking) => void
    onEventResize: (booking: Booking) => void
    isLoading?: boolean
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

export function Calendar({
    bookings,
    services,
    onSelectSlot,
    onEventClick,
    onEventDrop,
    onEventResize,
    isLoading,
}: CalendarProps) {
    const calendarRef = useRef<FullCalendar>(null)
    const [currentView, setCurrentView] = useState<"timeGridWeek" | "timeGridDay" | "dayGridMonth">("timeGridWeek")

    const getServiceColor = (serviceId: string) => {
        const index = services.findIndex(s => s.id === serviceId)
        if (index === -1) return "#10b981"
        return SERVICE_COLORS[index % SERVICE_COLORS.length]
    }

    const events = bookings.map((booking) => {
        const color = getServiceColor(booking.serviceId)
        return {
            id: booking.id,
            title: booking.title,
            start: booking.start,
            end: booking.end,
            backgroundColor: color,
            borderColor: color,
            extendedProps: { booking },
        }
    })

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        onSelectSlot(selectInfo.start, selectInfo.end)
        const calendarApi = selectInfo.view.calendar
        calendarApi.unselect()
    }

    const handleEventClick = (clickInfo: EventClickArg) => {
        const booking = clickInfo.event.extendedProps.booking as Booking
        onEventClick(booking)
    }

    const handleEventDrop = (dropInfo: EventDropArg) => {
        const booking = dropInfo.event.extendedProps.booking as Booking
        onEventDrop({
            ...booking,
            start: dropInfo.event.start!,
            end: dropInfo.event.end!,
        })
    }

    const handleEventResize = (resizeInfo: EventResizeDoneArg) => {
        const booking = resizeInfo.event.extendedProps.booking as Booking
        onEventResize({
            ...booking,
            start: resizeInfo.event.start!,
            end: resizeInfo.event.end!,
        })
    }

    const goToday = () => {
        const calendarApi = calendarRef.current?.getApi()
        calendarApi?.today()
    }

    const goPrev = () => {
        const calendarApi = calendarRef.current?.getApi()
        calendarApi?.prev()
    }

    const goNext = () => {
        const calendarApi = calendarRef.current?.getApi()
        calendarApi?.next()
    }

    const changeView = (view: "timeGridWeek" | "timeGridDay" | "dayGridMonth") => {
        const calendarApi = calendarRef.current?.getApi()
        calendarApi?.changeView(view)
        setCurrentView(view)
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                    <button
                        onClick={goPrev}
                        className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={goToday}
                        className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Hoje
                    </button>
                    <button
                        onClick={goNext}
                        className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                    >
                        Próximo
                    </button>
                </div>
                <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                    <button
                        onClick={() => changeView("dayGridMonth")}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${currentView === "dayGridMonth"
                            ? "bg-card text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Mês
                    </button>
                    <button
                        onClick={() => changeView("timeGridWeek")}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${currentView === "timeGridWeek"
                            ? "bg-card text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Semana
                    </button>
                    <button
                        onClick={() => changeView("timeGridDay")}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${currentView === "timeGridDay"
                            ? "bg-card text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Dia
                    </button>
                </div>
            </div>
            <div className="flex-1 calendar-wrapper">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    locale={ptBrLocale}
                    headerToolbar={false}
                    events={events}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                    eventDrop={handleEventDrop}
                    eventResize={handleEventResize}
                    slotMinTime="06:00:00"
                    slotMaxTime="24:00:00"
                    slotDuration="00:30:00"
                    allDaySlot={false}
                    height="100%"
                    nowIndicator={true}
                    eventTimeFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        meridiem: false,
                        hour12: false,
                    }}
                    slotLabelFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        meridiem: false,
                        hour12: false,
                    }}
                />
            </div>
        </div>
    )
}
