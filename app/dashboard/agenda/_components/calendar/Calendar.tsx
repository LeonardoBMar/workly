'use client';

import { useRef, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import type {
  EventClickArg,
  DateSelectArg,
  EventDropArg,
} from '@fullcalendar/core';
import type { EventResizeDoneArg } from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

import type { Booking } from '../../types';
import type { CalendarProps } from './types';
import { usePersistedTimeRange } from './hooks/usePersistedTimeRange';
import { useCalendarNavigation } from './hooks/useCalendarNavigation';
import { mapBookingsToEvents } from './utils/mapBookingsToEvents';
import { CalendarToolbar } from './CalendarToolbar';

export function Calendar({
  bookings,
  services,
  onSelectSlot,
  onEventClick,
  onEventDrop,
  onEventResize,
}: CalendarProps) {
  const calendarRef = useRef<FullCalendar>(null);
  const { timeRange, updateTimeRange } = usePersistedTimeRange();
  const { currentView, goToday, goPrev, goNext, changeView } =
    useCalendarNavigation(calendarRef);

  const events = useMemo(
    () => mapBookingsToEvents(bookings, services),
    [bookings, services],
  );

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    onSelectSlot(selectInfo.start, selectInfo.end);
    selectInfo.view.calendar.unselect();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const booking = clickInfo.event.extendedProps.booking as Booking;
    onEventClick(booking);
  };

  const handleEventDrop = (dropInfo: EventDropArg) => {
    const booking = dropInfo.event.extendedProps.booking as Booking;
    onEventDrop({
      ...booking,
      start: dropInfo.event.start!,
      end: dropInfo.event.end!,
    });
  };

  const handleEventResize = (resizeInfo: EventResizeDoneArg) => {
    const booking = resizeInfo.event.extendedProps.booking as Booking;
    onEventResize({
      ...booking,
      start: resizeInfo.event.start!,
      end: resizeInfo.event.end!,
    });
  };

  return (
    <div className="flex h-full flex-col">
      <CalendarToolbar
        timeRange={timeRange}
        onTimeRangeChange={updateTimeRange}
        currentView={currentView}
        onChangeView={changeView}
        onPrev={goPrev}
        onToday={goToday}
        onNext={goNext}
      />

      <div className="calendar-wrapper flex-1">
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
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
          slotMinTime={`${timeRange[0].toString().padStart(2, '0')}:00:00`}
          slotMaxTime={`${Math.min(timeRange[1] + 1, 24)
            .toString()
            .padStart(2, '0')}:00:00`}
          slotDuration="00:30:00"
          allDaySlot={false}
          height="100%"
          nowIndicator={true}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: false,
          }}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: false,
          }}
        />
      </div>
    </div>
  );
}
