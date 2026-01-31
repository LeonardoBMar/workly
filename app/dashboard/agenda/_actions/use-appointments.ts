import { useState, useEffect, useCallback } from "react";
import type { Booking } from "../types";

interface UseAppointmentsOptions {
    startDate?: Date;
    endDate?: Date;
    autoFetch?: boolean;
}

interface AppointmentData {
    id: string;
    clientId: string;
    serviceId: string;
    startTime: string;
    endTime: string;
    status: string;
    notes?: string;
    clientName?: string;
    clientPhone?: string;
}

export function useAppointments(options: UseAppointmentsOptions = {}) {
    const { startDate, endDate, autoFetch = true } = options;
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const transformAppointmentToBooking = (appointment: AppointmentData): Booking => {
        return {
            id: appointment.id,
            serviceId: appointment.serviceId,
            title: `${appointment.clientName || "Cliente"}`,
            start: new Date(appointment.startTime),
            end: new Date(appointment.endTime),
            clientName: appointment.clientName,
            clientPhone: appointment.clientPhone,
            notes: appointment.notes,
        };
    };

    const fetchAppointments = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            if (startDate) params.append("startDate", startDate.toISOString());
            if (endDate) params.append("endDate", endDate.toISOString());

            const response = await fetch(`/api/appointments?${params.toString()}`);

            if (!response.ok) {
                throw new Error("Failed to fetch appointments");
            }

            const data: AppointmentData[] = await response.json();
            const transformedBookings = data.map(transformAppointmentToBooking);
            setBookings(transformedBookings);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error fetching appointments:", err);
        } finally {
            setIsLoading(false);
        }
    }, [startDate, endDate]);

    const createAppointment = useCallback(
        async (bookingData: Omit<Booking, "id">) => {
            setIsLoading(true);
            setError(null);

            try {
                if (!bookingData.clientId) {
                    throw new Error("Client ID is required");
                }

                const response = await fetch("/api/appointments", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        clientId: bookingData.clientId,
                        serviceId: bookingData.serviceId,
                        startTime: bookingData.start.toISOString(),
                        endTime: bookingData.end.toISOString(),
                        notes: bookingData.notes,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to create appointment");
                }

                const newAppointment: AppointmentData = await response.json();
                const newBooking = transformAppointmentToBooking(newAppointment);
                setBookings((prev) => [...prev, newBooking]);
                return newBooking;
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
                console.error("Error creating appointment:", err);
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const updateAppointment = useCallback(async (id: string, bookingData: Partial<Booking>) => {
        setIsLoading(true);
        setError(null);

        try {
            const updatePayload: any = {};
            if (bookingData.start) updatePayload.startTime = bookingData.start.toISOString();
            if (bookingData.end) updatePayload.endTime = bookingData.end.toISOString();
            if (bookingData.serviceId) updatePayload.serviceId = bookingData.serviceId;
            if (bookingData.notes !== undefined) updatePayload.notes = bookingData.notes;

            const response = await fetch(`/api/appointments/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatePayload),
            });

            if (!response.ok) {
                throw new Error("Failed to update appointment");
            }

            const updatedAppointment: AppointmentData = await response.json();
            const updatedBooking = transformAppointmentToBooking(updatedAppointment);
            setBookings((prev) => prev.map((b) => (b.id === id ? updatedBooking : b)));
            return updatedBooking;
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error updating appointment:", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteAppointment = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/appointments/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete appointment");
            }

            setBookings((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error deleting appointment:", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (autoFetch) {
            fetchAppointments();
        }
    }, [autoFetch, fetchAppointments]);

    return {
        bookings,
        isLoading,
        error,
        fetchAppointments,
        createAppointment,
        updateAppointment,
        deleteAppointment,
    };
}
