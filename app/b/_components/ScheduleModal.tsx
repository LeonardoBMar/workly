'use client';

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ScheduleModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl space-y-4 rounded-2xl bg-white p-6">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Agendar serviço</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
          <p className="text-sm text-amber-800">
            <strong>Aviso:</strong> O agendamento ainda não possui
            funcionalidade e está em desenvolvimento.
          </p>
        </div>
      </div>
    </div>
  );
}
