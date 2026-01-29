export interface Booking {
    id: string
    serviceId: string
    clientId?: string
    title: string
    start: Date
    end: Date
    clientName?: string
    clientPhone?: string
    notes?: string
}

