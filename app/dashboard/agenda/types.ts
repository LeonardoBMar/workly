import type { AppointmentStatus } from "@/lib/validation";

export interface Booking {
    id: string
    serviceId: string
    clientId?: string
    status?: AppointmentStatus
    title: string
    start: Date
    end: Date
    clientName?: string
    clientPhone?: string
    notes?: string
}

