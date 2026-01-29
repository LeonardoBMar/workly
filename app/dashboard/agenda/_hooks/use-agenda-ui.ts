import { useState, useCallback } from "react";
import type { Booking } from "../types";

export function useAgendaUI() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openModalForNewBooking = useCallback((start: Date, end: Date) => {
        setSelectedSlot({ start, end });
        setSelectedBooking(null);
        setIsModalOpen(true);
    }, []);

    const openModalForEditBooking = useCallback((booking: Booking) => {
        setSelectedBooking(booking);
        setSelectedSlot(null);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedBooking(null);
        setSelectedSlot(null);
    }, []);

    const toggleSidebar = useCallback(() => {
        setSidebarOpen((prev) => !prev);
    }, []);

    return {
        // Modal state
        isModalOpen,
        selectedBooking,
        selectedSlot,

        // Sidebar state
        sidebarOpen,

        // Actions
        openModalForNewBooking,
        openModalForEditBooking,
        closeModal,
        toggleSidebar,
    };
}
