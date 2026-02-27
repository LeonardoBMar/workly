import type { Booking } from '../../types';
import type { Service } from '../../_actions';

export type CalendarView = 'timeGridWeek' | 'timeGridDay' | 'dayGridMonth';

export interface CalendarProps {
  bookings: Booking[];
  services: Service[];
  onSelectSlot: (start: Date, end: Date) => void;
  onEventClick: (booking: Booking) => void;
  onEventDrop: (booking: Booking) => void;
  onEventResize: (booking: Booking) => void;
  isLoading?: boolean;
}
