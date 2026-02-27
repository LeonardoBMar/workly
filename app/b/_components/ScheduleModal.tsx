'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ptBR } from 'date-fns/locale';
import { useEscapeKey } from '../_hooks/useEscapeKey';
import { useLockBodyScroll } from '../_hooks/useLockBodyScroll';
import ModalHeader from './ModalHeader';
import AvailableHours from './AvailableHours';
import StepIndicator from './StepIndicator';
import CustomerInfoStep from './CustomerInfoStep';
import { ArrowRight, Loader2 } from 'lucide-react';
import {
  getAvailableTimes,
  type AvailableTimeSlot,
} from '../_actions/get-available-times';
import { createBooking } from '../_actions/create-booking';

type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  shopperId: string;
  serviceId: string;
};

const STEPS = [{ label: 'Data e Horário' }, { label: 'Seus Dados' }];

function formatYYYYMMDD(dateStr: string) {
  const date = new Date(dateStr);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function ScheduleModal({
  isOpen,
  onClose,
  shopperId,
  serviceId,
}: ScheduleModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const [horarios, setHorarios] = useState<
    (string | AvailableTimeSlot)[] | null
  >(null);
  const [isPendingTimes, startTransitionTimes] = useTransition();
  const [isPendingBooking, startTransitionBooking] = useTransition();

  useEscapeKey(onClose, isOpen);
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (selectedDate && isOpen) {
      setHorarios(null);
      setSelectedTime(null);

      const formattedDate = formatYYYYMMDD(selectedDate);

      const now = new Date();
      // Resetar minutos e horas do selectedDate e now pra checar se é passado
      const resetTime = (d: Date) =>
        new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const selectedAsDate = resetTime(new Date(selectedDate));
      const todayAsDate = resetTime(now);

      startTransitionTimes(async () => {
        try {
          const available = await getAvailableTimes(
            shopperId,
            serviceId,
            formattedDate,
          );
          setHorarios(available);
        } catch (error) {
          console.error('Erro ao carregar horários', error);
        }
      });
    }
  }, [selectedDate, shopperId, serviceId, isOpen]);

  if (!isOpen) return null;

  const canGoNext = selectedDate !== null && selectedTime !== null;

  const handleNext = () => {
    if (canGoNext) setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;

    startTransitionBooking(async () => {
      try {
        await createBooking(
          shopperId,
          serviceId,
          formatYYYYMMDD(selectedDate),
          selectedTime,
          customerName,
          customerPhone,
        );
        onClose();

        setCurrentStep(1);
        setSelectedDate(null);
        setSelectedTime(null);
        setCustomerName('');
        setCustomerPhone('');

        alert('Agendamento realizado! Aguardando confirmação do profissional.');
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('Erro ao realizar agendamento.');
        }
      }
    });
  };

  const subtitle =
    currentStep === 1
      ? 'Selecione uma data e horário'
      : 'Informe seus dados para confirmar';

  return (
    <div
      ref={overlayRef}
      className="schedule-backdrop fixed inset-0 z-50 flex items-end justify-center md:items-center"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="schedule-modal flex w-full flex-col md:max-w-4xl">
        <ModalHeader onClose={onClose} subtitle={subtitle} />

        <div className="mt-3 md:mt-4">
          <StepIndicator currentStep={currentStep} steps={STEPS} />
        </div>

        {currentStep === 1 && (
          <div className="step-slide-in schedule-modal-content mt-4 flex flex-col gap-5 overflow-y-auto md:mt-6 md:grid md:h-[420px] md:grid-cols-[380px_1fr] md:gap-8 md:overflow-visible">
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
                  const now = new Date();
                  now.setHours(0, 0, 0, 0);
                  if (info.date < now) return;
                  setSelectedDate(info.date.toDateString());
                }}
                dayCellClassNames={(arg) => {
                  const classes = [];
                  if (arg.date.toDateString() === selectedDate)
                    classes.push('fc-day-selected');

                  const now = new Date();
                  now.setHours(0, 0, 0, 0);
                  if (arg.date < now) classes.push('fc-day-past-disabled');

                  return classes.join(' ');
                }}
              />
            </div>

            <div className="flex min-h-[140px] w-full flex-col rounded-xl border border-gray-200/80 bg-gray-50/30 md:h-full md:min-h-0">
              <div className="relative flex-1 overflow-y-auto">
                {isPendingTimes ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                    <p className="text-sm text-gray-500">
                      Carregando horários...
                    </p>
                  </div>
                ) : (
                  <AvailableHours
                    selectedDate={selectedDate}
                    horarios={horarios as any}
                    selectedTime={selectedTime}
                    onSelectTime={setSelectedTime}
                  />
                )}
              </div>

              {canGoNext && (
                <div className="border-t border-gray-100 p-3 md:p-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:shadow-xl hover:shadow-blue-300"
                  >
                    Próximo
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="relative mt-4 md:mt-6">
            {isPendingBooking && (
              <div className="absolute inset-0 z-10 flex min-h-[300px] items-center justify-center rounded-xl bg-white/70 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <p className="text-sm font-medium text-gray-800">
                    Finalizando agendamento...
                  </p>
                </div>
              </div>
            )}
            <CustomerInfoStep
              customerName={customerName}
              customerPhone={customerPhone}
              onChangeName={setCustomerName}
              onChangePhone={setCustomerPhone}
              onBack={handleBack}
              onConfirm={handleConfirm}
            />
          </div>
        )}
      </div>
    </div>
  );
}
