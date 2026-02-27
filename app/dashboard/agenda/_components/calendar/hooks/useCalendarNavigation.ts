'use client';

import { useState, useCallback } from 'react';
import type { RefObject } from 'react';
import type FullCalendar from '@fullcalendar/react';
import type { CalendarView } from '../types';

export function useCalendarNavigation(
  calendarRef: RefObject<FullCalendar | null>,
) {
  const [currentView, setCurrentView] = useState<CalendarView>('timeGridDay');

  const goToday = useCallback(() => {
    calendarRef.current?.getApi()?.today();
  }, [calendarRef]);

  const goPrev = useCallback(() => {
    calendarRef.current?.getApi()?.prev();
  }, [calendarRef]);

  const goNext = useCallback(() => {
    calendarRef.current?.getApi()?.next();
  }, [calendarRef]);

  const changeView = useCallback(
    (view: CalendarView) => {
      calendarRef.current?.getApi()?.changeView(view);
      setCurrentView(view);
    },
    [calendarRef],
  );

  return { currentView, goToday, goPrev, goNext, changeView } as const;
}
