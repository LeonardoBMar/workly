'use client';

import { useState, useRef } from 'react';
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
import { ArrowRight } from 'lucide-react';

type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  shopperId: string;
  serviceId: string;
};

const horarios = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
];

const STEPS = [{ label: 'Data e Horário' }, { label: 'Seus Dados' }];

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

  useEscapeKey(onClose, isOpen);
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  const canGoNext = selectedDate !== null && selectedTime !== null;

  const handleNext = () => {
    if (canGoNext) setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleConfirm = () => {
    // TODO: hook up to server action
    onClose();
    // reset state
    setCurrentStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setCustomerName('');
    setCustomerPhone('');
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

        {/* Step 1: Date & Time */}
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
                dayCellClassNames={(arg) =>
                  arg.date.toDateString() === selectedDate
                    ? 'fc-day-selected'
                    : ''
                }
                dateClick={(info) => {
                  setSelectedDate(info.date.toDateString());
                }}
              />
            </div>

            <div className="flex min-h-[140px] w-full flex-col rounded-xl border border-gray-200/80 bg-gray-50/30 md:h-full md:min-h-0">
              <div className="flex-1 overflow-y-auto">
                <AvailableHours
                  selectedDate={selectedDate}
                  horarios={horarios}
                  selectedTime={selectedTime}
                  onSelectTime={setSelectedTime}
                />
              </div>

              {/* Next button */}
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

        {/* Step 2: Customer Info */}
        {currentStep === 2 && (
          <div className="mt-4 md:mt-6">
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
