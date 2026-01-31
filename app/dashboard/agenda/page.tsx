"use client"

import { Calendar } from "./_components/calendar"
import { BookingModal } from "./_components/booking-modal"
import { Sidebar } from "./_components/sidebar"
import { useAppointments, useAgendaUI, useAgendaHandlers, useServices } from "./_actions"

export default function AgendaPage() {
    const { services, isLoading: isLoadingServices } = useServices()

    const {
        bookings,
        isLoading: isLoadingAppointments,
        error,
        createAppointment,
        updateAppointment,
        deleteAppointment,
    } = useAppointments()

    const isLoading = isLoadingAppointments || isLoadingServices

    const {
        isModalOpen,
        selectedBooking,
        selectedSlot,
        sidebarOpen,
        openModalForNewBooking,
        openModalForEditBooking,
        closeModal,
    } = useAgendaUI()

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
    })

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Erro ao carregar agenda</h2>
                    <p className="text-muted-foreground">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-screen bg-background">
            <div
                className={`
          fixed lg:static inset-y-0 left-0 z-40
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
            >
                <Sidebar
                    bookings={bookings}
                    services={services}
                    onNewBooking={handleNewBooking}
                    isLoading={isLoading}
                />
            </div>

            <main className="flex-1 p-4 lg:p-6 overflow-hidden pt-16 lg:pt-6">
                <Calendar
                    bookings={bookings}
                    services={services}
                    onSelectSlot={handleSelectSlot}
                    onEventClick={handleEventClick}
                    onEventDrop={handleEventDrop}
                    onEventResize={handleEventResize}
                    isLoading={isLoading}
                />
            </main>

            <BookingModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={(bookingData) => handleSaveBooking(bookingData, selectedBooking?.id)}
                onDelete={selectedBooking ? () => handleDeleteBooking(selectedBooking.id) : undefined}
                booking={selectedBooking}
                selectedSlot={selectedSlot}
            />
        </div>
    )
}
