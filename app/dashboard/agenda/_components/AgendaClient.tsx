'use client';

import { Calendar } from './calendar';
import { BookingModal } from './booking-modal';
import { AgendaHeader, PendingPanel } from './sidebar';
import {
  useAppointments,
  useAgendaUI,
  useAgendaHandlers,
  useServices,
} from '../_actions';
import { notifyError, notifySuccess } from '@/lib/toast';
import { useCallback } from 'react';

export function AgendaClient() {
  const { services, isLoading: isLoadingServices } = useServices();

  const {
    bookings,
    isLoading: isLoadingAppointments,
    error,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  } = useAppointments();

  const isLoading = isLoadingAppointments || isLoadingServices;

  const {
    isModalOpen,
    selectedBooking,
    selectedSlot,
    sidebarOpen,
    openModalForNewBooking,
    openModalForEditBooking,
    closeModal,
  } = useAgendaUI();

  const {
    handleSelectSlot,
    handleEventClick,
    handleEventDrop,
    handleEventResize,
    handleSaveBooking,
    handleDeleteBooking,
    handleNewBooking,
  } = useAgendaHandlers({
    updateAppointment,
    createAppointment,
    deleteAppointment,
    openModalForNewBooking,
    openModalForEditBooking,
    closeModal,
  });

  const handleConfirmBooking = useCallback(
    async (bookingId: string) => {
      try {
        await updateAppointment(bookingId, { status: 'confirmed' });
        notifySuccess('Agendamento confirmado!');
      } catch {
        notifyError('Erro ao confirmar agendamento.');
      }
    },
    [updateAppointment],
  );

  const handleDiscardBooking = useCallback(
    async (bookingId: string) => {
      try {
        await deleteAppointment(bookingId);
        notifySuccess('Solicitação descartada.');
      } catch {
        notifyError('Erro ao descartar agendamento.');
      }
    },
    [deleteAppointment],
  );

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-red-600">
            Erro ao carregar agenda
          </h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background agenda-layout flex h-[calc(100vh-4rem)]">
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="mb-3">
          <AgendaHeader
            bookings={bookings}
            onNewBooking={handleNewBooking}
            isLoading={isLoading}
          />
        </div>

        <div className="min-h-0 flex-1">
          <Calendar
            bookings={bookings}
            services={services}
            onSelectSlot={handleSelectSlot}
            onEventClick={handleEventClick}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            isLoading={isLoading}
          />
        </div>
      </div>

      <PendingPanel
        bookings={bookings}
        services={services}
        isLoading={isLoading}
        onConfirm={handleConfirmBooking}
        onDiscard={handleDiscardBooking}
      />

      <BookingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={(bookingData) =>
          handleSaveBooking(bookingData, selectedBooking?.id)
        }
        onDelete={
          selectedBooking
            ? () => handleDeleteBooking(selectedBooking.id)
            : undefined
        }
        booking={selectedBooking}
        selectedSlot={selectedSlot}
      />
    </div>
  );
}
