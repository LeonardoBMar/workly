import type { Booking } from '../../../types';
import type { Service } from '../../../_actions';
import { SERVICE_COLORS, STATUS_COLORS } from '../constants';

export function mapBookingsToEvents(bookings: Booking[], services: Service[]) {
  return bookings
    .filter((b) => b.status !== 'pending')
    .map((booking) => {
      const statusColor = booking.status ? STATUS_COLORS[booking.status] : null;
      const serviceIndex = services.findIndex(
        (s) => s.id === booking.serviceId,
      );
      const color =
        statusColor ||
        (serviceIndex === -1
          ? SERVICE_COLORS[0]
          : SERVICE_COLORS[serviceIndex % SERVICE_COLORS.length]);

      return {
        id: booking.id,
        title: booking.title,
        start: booking.start,
        end: booking.end,
        backgroundColor: color,
        borderColor: color,
        extendedProps: { booking },
      };
    });
}
