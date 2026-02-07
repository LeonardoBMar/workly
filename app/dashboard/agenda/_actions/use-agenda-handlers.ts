import { useCallback } from "react";
import type { Booking } from "../types";
import { notifyError, notifySuccess } from "@/lib/toast";

interface UseAgendaHandlersProps {
    updateAppointment: (id: string, data: Partial<Booking>) => Promise<Booking>;
    createAppointment: (data: Omit<Booking, "id">) => Promise<Booking>;
    deleteAppointment: (id: string) => Promise<void>;
    openModalForNewBooking: (start: Date, end: Date) => void;
    openModalForEditBooking: (booking: Booking) => void;
    closeModal: () => void;
}

export function useAgendaHandlers({
    updateAppointment,
    createAppointment,
    deleteAppointment,
    openModalForNewBooking,
    openModalForEditBooking,
    closeModal,
}: UseAgendaHandlersProps) {
    const handleSelectSlot = useCallback(
        (start: Date, end: Date) => {
            openModalForNewBooking(start, end);
        },
        [openModalForNewBooking]
    );

    const handleEventClick = useCallback(
        (booking: Booking) => {
            openModalForEditBooking(booking);
        },
        [openModalForEditBooking]
    );

    const handleEventDrop = useCallback(
        async (updatedBooking: Booking) => {
            try {
                await updateAppointment(updatedBooking.id, {
                    start: updatedBooking.start,
                    end: updatedBooking.end,
                });
                notifySuccess("Agendamento atualizado!");
            } catch (error) {
                console.error("Error updating appointment:", error);
                notifyError("Erro ao atualizar agendamento.");
            }
        },
        [updateAppointment]
    );

    const handleEventResize = useCallback(
        async (updatedBooking: Booking) => {
            try {
                await updateAppointment(updatedBooking.id, {
                    start: updatedBooking.start,
                    end: updatedBooking.end,
                });
                notifySuccess("Duração do agendamento atualizada!");
            } catch (error) {
                console.error("Error resizing appointment:", error);
                notifyError("Erro ao redimensionar agendamento.");
            }
        },
        [updateAppointment]
    );

    const handleSaveBooking = useCallback(
        async (bookingData: Omit<Booking, "id">, existingBookingId?: string) => {
            try {
                if (existingBookingId) {
                    await updateAppointment(existingBookingId, bookingData);
                    notifySuccess("Agendamento atualizado com sucesso!");
                } else {
                    await createAppointment(bookingData);
                    notifySuccess("Agendamento criado com sucesso!");
                }
                closeModal();
            } catch (error) {
                console.error("Error saving appointment:", error);
                notifyError("Erro ao salvar agendamento.");
                throw error;
            }
        },
        [updateAppointment, createAppointment, closeModal]
    );

    const handleDeleteBooking = useCallback(
        async (bookingId: string) => {
            try {
                await deleteAppointment(bookingId);
                notifySuccess("Agendamento excluído com sucesso!");
                closeModal();
            } catch (error) {
                console.error("Error deleting appointment:", error);
                notifyError("Erro ao excluir agendamento.");
                throw error;
            }
        },
        [deleteAppointment, closeModal]
    );

    const handleNewBooking = useCallback(() => {
        const now = new Date();
        now.setMinutes(0, 0, 0);
        const end = new Date(now.getTime() + 30 * 60000);
        openModalForNewBooking(now, end);
    }, [openModalForNewBooking]);

    return {
        handleSelectSlot,
        handleEventClick,
        handleEventDrop,
        handleEventResize,
        handleSaveBooking,
        handleDeleteBooking,
        handleNewBooking,
    };
}
