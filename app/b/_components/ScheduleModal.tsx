'use client';

import { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ptBR } from 'date-fns/locale';
import { X, CalendarDays } from 'lucide-react';

type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  shopperId: string;
  serviceId: string;
};

export default function ScheduleModal({
  isOpen,
  onClose,
  shopperId,
  serviceId,
}: ScheduleModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="schedule-backdrop fixed inset-0 z-50 flex items-end justify-center md:items-center"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="schedule-modal flex w-full flex-col md:max-w-4xl">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 md:pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-md shadow-indigo-200 md:h-10 md:w-10">
              <CalendarDays className="h-[18px] w-[18px] md:h-5 md:w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight text-gray-900 md:text-lg">
                Agendar serviço
              </h2>
              <p className="text-xs text-gray-400 md:text-sm">
                Selecione uma data disponível
              </p>
            </div>
          </div>
          <button
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600 md:h-8 md:w-8 md:rounded-lg"
            onClick={onClose}
          >
            <X className="h-5 w-5 md:h-[18px] md:w-[18px]" />
          </button>
        </div>

        <div className="schedule-modal-content mt-4 flex flex-col gap-5 overflow-y-auto md:mt-6 md:grid md:h-[420px] md:grid-cols-[380px_1fr] md:gap-8 md:overflow-visible">
          <div className="schedule-calendar">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              locale={ptBR}
              fixedWeekCount={false}
              showNonCurrentDates={false}
              height="auto"
              headerToolbar={{
                left: 'prev',
                center: 'title',
                right: 'next',
              }}
              selectable
              events={[]}
              dateClick={(info) => {
                document
                  .querySelectorAll('.fc-day-selected')
                  .forEach((el) => el.classList.remove('fc-day-selected'));

                info.dayEl.classList.add('fc-day-selected');
              }}
            />
          </div>

          <div className="flex min-h-[140px] w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 md:h-full md:min-h-0">
            <p className="text-sm text-gray-300">Horários disponíveis</p>
          </div>
        </div>
      </div>
    </div>
  );
}
